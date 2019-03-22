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
const RecController = __importStar(require("../controllers/record"));
const ApiRouter = express_1.Router();
exports.default = (app) => {
    ApiRouter.delete(':id', RecController.deleteRec);
    ApiRouter.get('/:id', RecController.getRecData);
    app.use('/api/records', ApiRouter);
};
//# sourceMappingURL=record.js.map