import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { Document, FilterQuery, Model, Types } from "mongoose";
import { HashingService } from "src/iam/hashing/hashing.service";
import { FilterUsersDto } from "./dto/filter-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private readonly hashingService: HashingService) {}
  async create(payload: CreateUserDto) {
    try {
      /** Hasheamos la contraseña */
      payload.password = await this.hashingService.hash(payload.password.trim());
      const newRecord = new this.userModel(payload);
      return await newRecord.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(params?: FilterUsersDto) {
    try {
      let filters: FilterQuery<User> = { isDeleted: false };
      const { limit, offset, firstName } = params;
      if (params) {
        /** Busqueda por el nombre */
        if (firstName) {
          filters = {
            firstName: {
              $regex: firstName,
              $options: "i",
            },
            ...filters,
          };
        }
      }

      /** Obtenemos los registros */
      const records = await this.userModel
        .find(filters)
        .limit(limit)
        .skip(offset * limit)
        .exec();
      const totalDocuments = await this.userModel.countDocuments(filters).exec();

      return {
        records,
        totalDocuments,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const record = await this.userModel.findById(id.trim()).exec();
      if (!record) {
        throw new NotFoundException("Registro no encontrado");
      }
      return record;
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async update(id: string, payload: UpdateUserDto) {
    try {
      const user = await this.findOne(id);

      /** Verificamos si el usuario esta cambiando su contraseña */
      if (payload.new_password.trim() && payload.new_password.trim() !== "") {
        /** Confirmamos si la contraseña es correcta */
        const isPasswordMatched = await this.hashingService.compare(payload.password.trim(), user.password);
        if (!isPasswordMatched) {
          throw new BadRequestException("Por favor ingrese un email y/o contraseña válida");
        }
        /** Hasheamos y asignamos la nueva contraseña */
        payload.password = await this.hashingService.hash(payload.new_password.trim());
      }

      return await this.userModel.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string) {
    try {
      const user = await this.findOne(id);
      if (user.isLocked) {
        throw new UnauthorizedException(`No se puede eliminar el registro. Error ${HttpStatus.UNAUTHORIZED}`);
      }
      if (user.isDeleted) {
        throw new NotFoundException("No se encontro el registro");
      }
      return await this.userModel.findByIdAndUpdate(id, { isDeleted: !user.isDeleted, isActive: !user.isActive }, { new: true, runValidators: true }).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
