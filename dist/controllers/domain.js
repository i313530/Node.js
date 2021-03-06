"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = __importDefault(require("../services/domain"));
/* API Controllers */
exports.getDomainValues = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const allValues = domain_1.default.getallFixVal();
        res.json(allValues);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
//# sourceMappingURL=domain.js.map