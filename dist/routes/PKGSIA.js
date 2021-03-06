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
    ApiRouter.post('/:pkgid/:siid', PKGAController.addAssignment);
    ApiRouter.post('/newsi/:pkgid/:siid', PKGAController.createNewSIandAssign);
    ApiRouter.delete('/:pkgid/:siid', PKGAController.removeAssignment);
    ApiRouter.get('/:id', PKGAController.getAssignments);
    app.use('/api/pkgsiA', ApiRouter);
};
//# sourceMappingURL=PKGSIA.js.map