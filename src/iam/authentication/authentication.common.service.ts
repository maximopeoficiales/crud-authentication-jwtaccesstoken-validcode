import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";
import { HashingService } from "../hashing/hashing.service";
import config from "src/config";
import { ConfigType } from "@nestjs/config";
import { SignInDto } from "./dto/sigin-auth.dto";
import { PayloadToken } from "../models/token.model";
import { Auth } from "../entities/auth.entity";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { createHash, randomBytes } from "crypto";

@Injectable()
export class AuthenticationCommonService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  /** Creamos el documento para la sesión */
  async createAutheticationSession(data: CreateAuthDto) {
    try {
      /** Generamos el validAuthToken */
      const validAuthToken = randomBytes(20).toString("hex");

      /** Encriptamos el token */
      data.validAuthToken = createHash("sha256").update(validAuthToken).digest("hex");

      /** Generamos el tiempo de expiración del validAuthToken (5 minutos) */
      data.validAuthExpire = new Date(Date.now() + 5 * 60 * 1000);

      const newRecord = new this.authModel(data);

      return await newRecord.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /** Actualizamos el token del documento de la sesión */
  async updateAuthenticationSession(id: string, accessToken: string, refreshToken: string, code, ip?: string) {
    try {
      /** Generamos el validAuthToken */
      const validAuthToken = randomBytes(20).toString("hex");

      /** Encriptamos el token */
      const hashedValidAuthToken = createHash("sha256").update(validAuthToken).digest("hex");

      /** Generamos el tiempo de expiración del validAuthToken (5 minutos) */
      const validAuthExpire = new Date(Date.now() + 5 * 60 * 1000);

      return await this.authModel.findByIdAndUpdate(id, { accessToken, refreshToken, code, ip, validAuthToken: hashedValidAuthToken, validAuthExpire }, { new: true, runValidators: true }).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /** Buscamos por el email del usuario */
  async findUserAuthByEmail(email: string) {
    try {
      const record = await this.userModel.findOne({ email }).exec();

      if (!record) {
        throw new NotFoundException("Registro no encontrado");
      }
      return record;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /** Generador de access token */
  generateJwtAccessToken(payload: PayloadToken) {
    try {
      const accessToken = this.jwtService.signAsync(payload, {
        secret: this.configService.owner.jwtSecretOwner,
        expiresIn: this.configService.owner.jwtExpiresTimeOwner,
      });

      return accessToken;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /** Generador de refresh token */
  generateJwtRefreshToken(payload: PayloadToken) {
    try {
      const refreshToken = this.jwtService.signAsync(payload, {
        secret: this.configService.owner.jwtSecretRefreshOwner,
        expiresIn: this.configService.owner.jwtRefereshExpiresTimeOwner,
      });

      return refreshToken;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /** Verificamos si la sesion es valida para el guard o endpoint (se usa en el valid.auth.guard.ts) */
  async validAuthentication(user: string, ip?: string) {
    try {
      /** Buscamos la sesión si existe y si el device ya existe se actualiza si no se crea una nueva sesión */
      const auth = await this.authModel.findOne({ user: user, ip }).exec();

      if (auth && auth.authStatus && auth.saveDevice) {
        return true;
      }
      return false;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /** Validamos que exista el token (se usa en valid-token-auth-session.guard)*/
  async validAuthToken(user: string, token: string) {
    try {
      const validToken = await this.authModel.findOne({ user, accessToken: token.trim() });

      if (validToken) {
        return true;
      }
      return false;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /** Este servicio solo se esta usando en el JwtStrategy */
  async findUserAuthenticated(payload: SignInDto) {
    try {
      /** Buscamos los datos del usuario (email y contraseña) */
      const user = await this.userModel.findOne({ email: payload.email.trim() }).exec();

      /** Si el usuario no existe le enviamos una exepción */
      if (!user) {
        throw new BadRequestException("Por favor ingrese un email y/o contraseña válida");
      }

      /** Confirmamos si la contraseña es correcta */
      const isPasswordMatched = await this.hashingService.compare(payload.password.trim(), user.password);

      if (!isPasswordMatched) {
        throw new BadRequestException("Por favor ingrese un email y/o contraseña válida");
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
