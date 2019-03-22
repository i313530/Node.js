"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ORMError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.code = 400;
    }
}
exports.ORMError = ORMError;
//# sourceMappingURL=ORMerror.js.map