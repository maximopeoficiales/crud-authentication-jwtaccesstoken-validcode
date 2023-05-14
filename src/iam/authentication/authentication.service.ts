import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/entities/user.entity";
import { PayloadToken } from "../models/token.model";
import { Auth } from "../entities/auth.entity";
import { MailService } from "src/common/providers/mail/mail.service";
import { generateInternalCode } from "src/common/utils";
import { UserSignInPayload } from "../models/user.model";
import { AuthenticationCommonService } from "./authentication.common.service";
import { PayloadValidAuthCode } from "../models/auth.code.model";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    private readonly mailService: MailService,
    private readonly authCommonService: AuthenticationCommonService,
  ) {}

  /** Servicio para iniciar Sesión (desde el LocalStrategy) y aqui generamos los tokens y las validaciones con el envio del correo */
  async signIn(payload: UserSignInPayload) {
    try {
      /** Tipamos la data para generar el jwt */
      const data: PayloadToken = { id: payload.id, role: payload.role, ip: payload.ip };

      /** Generamos el access y refresh token */

      const accessToken = await this.authCommonService.generateJwtAccessToken(data);
      const refreshToken = await this.authCommonService.generateJwtRefreshToken(data);

      /** Buscamos si existe la sesión. Si existe y si el device esta autorizado solo se actualiza si no se crea una nueva sesión */
      const auth = await this.authModel.findOne({ user: payload.id, ip: payload.ip });

      /** Generamos el codigo para la sesión y enviar al correo */
      const code = generateInternalCode(6);

      /** Si existe la sesion pero el authStatus, saveDevice son falsos y la ip es la misma se actualiza */
      //      if (auth && !auth.authStatus && !auth.saveDevice && auth.ip === payload.ip) {
      //     }
      if (auth) {
        if (auth && !auth.authStatus && !auth.saveDevice && auth.ip === payload.ip) {
          /** Actualizamos la sesion pero no autorizamos el ingreso hasta que el usuario valide desde el código enviado al correo */
          await this.authCommonService.updateAuthenticationSession(auth.id, accessToken, refreshToken, code, payload.ip);
        }
      } else {
        /** Si existe la sesion pero el authStatus, saveDevice son falsos y la ip es diferente se crea una nueva sesión */
        /** Creamos la sesion pero no autorizamos el ingreso hasta que el usuario valide desde el el código enviado al correo
         * saveDevice: false
         * authStatus: false
         */
        await this.authCommonService.createAutheticationSession({ accessToken, refreshToken, code, ip: payload.ip, user: payload.id });
      }

      if (auth && auth.authStatus && auth.saveDevice && auth.ip === payload.ip) {
        return {
          message: `Acceso autorizado`,
          pending: false,
          accessToken,
          refreshToken,
          user: payload,
        };
      } else {
        /** Generamos el texto para enviar al correo */
        const messageHTML = `Se esta intentando ingresar de un dispositivo desconocido, por favor confirme que es usted, su código de seguridad es: \n\n${code}`;

        try {
          await this.mailService.sendEmailWithDefaultFrom({
            To: payload.email,
            Subject: `Alerta - Inicio de sesión`,
            Message: messageHTML,
          });

          return {
            message: `Ingrese el código de seguridad enviado a su cuenta de correo: ${payload.email}`,
            pending: true,
          };
        } catch (error) {
          await this.userModel.findByIdAndUpdate(payload.id, { validAuthToken: undefined, validAuthExpire: undefined }, { new: true, runValidators: true }).exec();

          throw new InternalServerErrorException(error.message);
        }
      }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  /** Validamos que el usuario exista el auth && auth.authStatus && auth.saveDevice todos sean true */
  async validateStatusAuthenticationCode(payload: PayloadValidAuthCode) {
    try {
      const auth = await this.authModel.findOne({ user: payload.user, code: payload.code, ip: payload.ip, validAuthExpire: { $gt: Date.now() } }).exec();

      if (!auth) {
        throw new UnauthorizedException("El código es incorrecto o la sesión ya expiró");
      }

      /** Actualizamos la sesion, autorizando el ingreso */
      await this.authModel.findByIdAndUpdate(auth.id, { saveDevice: true, authStatus: true }, { new: true, runValidators: true }).exec();

      return { message: `Acceso autorizado`, pending: false, accessToken: auth.accessToken, refreshToken: auth.refreshToken, user: payload.user };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
