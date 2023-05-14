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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    constructor() {
        this.isActive = true;
    }
}
__decorate([
    (0, class_validator_1.IsString)({ message: "El email debe contener caractéres validos" }),
    (0, class_validator_1.IsEmail)({}, { message: "Este campo debe ser un email válido" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "La contraseña debe contener caractéres validos" }),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)({ message: "La contraseña es un campo requerido" }),
    (0, class_validator_1.Matches)(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "La contraseña debe tener letas mayúsculas, minusculas y numeros",
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "El nombres son requeridos" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Los apellidos son requeridos" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isLocked", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isDeleted", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map