"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const hashing_service_1 = require("../iam/hashing/hashing.service");
let UsersService = class UsersService {
    constructor(userModel, hashingService) {
        this.userModel = userModel;
        this.hashingService = hashingService;
    }
    async create(payload) {
        try {
            payload.password = await this.hashingService.hash(payload.password.trim());
            const newRecord = new this.userModel(payload);
            return await newRecord.save();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll(params) {
        try {
            let filters = { isDeleted: false };
            const { limit, offset, firstName } = params;
            if (params) {
                if (firstName) {
                    filters = Object.assign({ firstName: {
                            $regex: firstName,
                            $options: "i",
                        } }, filters);
                }
            }
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(id) {
        try {
            const record = await this.userModel.findById(id.trim()).exec();
            if (!record) {
                throw new common_1.NotFoundException("Registro no encontrado");
            }
            return record;
        }
        catch (error) {
            throw new common_1.NotFoundException(`${error.message}`);
        }
    }
    async update(id, payload) {
        try {
            const user = await this.findOne(id);
            if (payload.new_password.trim() && payload.new_password.trim() !== "") {
                const isPasswordMatched = await this.hashingService.compare(payload.password.trim(), user.password);
                if (!isPasswordMatched) {
                    throw new common_1.BadRequestException("Por favor ingrese un email y/o contraseña válida");
                }
                payload.password = await this.hashingService.hash(payload.new_password.trim());
            }
            return await this.userModel.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }).exec();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const user = await this.findOne(id);
            if (user.isLocked) {
                throw new common_1.UnauthorizedException(`No se puede eliminar el registro. Error ${common_1.HttpStatus.UNAUTHORIZED}`);
            }
            if (user.isDeleted) {
                throw new common_1.NotFoundException("No se encontro el registro");
            }
            return await this.userModel.findByIdAndUpdate(id, { isDeleted: !user.isDeleted, isActive: !user.isActive }, { new: true, runValidators: true }).exec();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, hashing_service_1.HashingService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map