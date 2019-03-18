"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DomainController = __importStar(require("../controllers/domain"));
const ApiRouter = express_1.Router();
exports.default = (app) => {
    ApiRouter.get('/', DomainController.getDomainValues);
    app.use('/api/domain', ApiRouter);
};
//# sourceMappingURL=domain.js.map