"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInternalCode = void 0;
const generateInternalCode = (length = 6) => {
    let internal_code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        internal_code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return internal_code;
};
exports.generateInternalCode = generateInternalCode;
//# sourceMappingURL=utils.js.map