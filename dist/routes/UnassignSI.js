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
const PKGAController = __importStar(require("../controllers/package"));
const ApiRouter = express_1.Router();
exports.default = (app) => {
    ApiRouter.get('/:id', PKGAController.getUnassignments);
    app.use('/api/unassignSI', ApiRouter);
};
//# sourceMappingURL=UnassignSI.js.map