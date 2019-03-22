"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ORMerror_1 = require("./ORMerror");
class DuplicateKey extends ORMerror_1.ORMError {
    constructor(message) {
        super(message);
        this.message = message;
        this.code = 400;
    }
}
exports.DuplicateKey = DuplicateKey;
// packageRepo.save(pkg).catch(error => {
// console.log(error)
// throw new DuplicateError(400, error.detail)
// }) 
//# sourceMappingURL=DuplicateKey.js.map