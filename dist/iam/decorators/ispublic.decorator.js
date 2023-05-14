"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPublic = exports.IS_PUBLIC = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC = "isPublic";
const IsPublic = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC, true);
exports.IsPublic = IsPublic;
//# sourceMappingURL=ispublic.decorator.js.map