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
const SIController = __importStar(require("../controllers/SI"));
const ApiRouter = express_1.Router();
exports.default = (app) => {
    ApiRouter.get('/', SIController.getScopeitems);
    ApiRouter.get('/field/:id', SIController.getFields);
    ApiRouter.get('/:id', SIController.getOneSI);
    ApiRouter.post('/', SIController.addScopeitem);
    ApiRouter.delete('/:id', SIController.removeScopeitem);
    app.use('/api/Scopeitem', ApiRouter);
};
//# sourceMappingURL=SI.js.map