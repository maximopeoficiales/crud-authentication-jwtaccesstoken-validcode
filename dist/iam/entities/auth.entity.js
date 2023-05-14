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
exports.AuthSchema = exports.Auth = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../../users/entities/user.entity");
let Auth = class Auth extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Auth.prototype, "accessToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Auth.prototype, "refreshToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], Auth.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true, default: false }),
    __metadata("design:type", Boolean)
], Auth.prototype, "saveDevice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true, default: false }),
    __metadata("design:type", Boolean)
], Auth.prototype, "authStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Auth.prototype, "validAuthToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Auth.prototype, "validAuthExpire", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Auth.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_entity_1.User.name, index: true }),
    __metadata("design:type", Object)
], Auth.prototype, "user", void 0);
Auth = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Auth);
exports.Auth = Auth;
exports.AuthSchema = mongoose_1.SchemaFactory.createForClass(Auth);
//# sourceMappingURL=auth.entity.js.map