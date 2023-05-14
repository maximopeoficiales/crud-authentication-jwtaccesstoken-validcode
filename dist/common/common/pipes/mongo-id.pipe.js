"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoIdPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let MongoIdPipe = class MongoIdPipe {
    transform(value, metadata) {
        if (!(0, class_validator_1.isMongoId)(value)) {
            throw new common_1.HttpException(`El ID: ${value} no existe`, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
};
MongoIdPipe = __decorate([
    (0, common_1.Injectable)()
], MongoIdPipe);
exports.MongoIdPipe = MongoIdPipe;
//# sourceMappingURL=mongo-id.pipe.js.map