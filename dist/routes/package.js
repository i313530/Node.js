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
const PKGController = __importStar(require("../controllers/package"));
const ApiRouter = express_1.Router();
exports.default = (app) => {
    ApiRouter.get('/', PKGController.getPackages);
    ApiRouter.post('/', PKGController.addPackage);
    ApiRouter.delete('/:id', PKGController.removePackage);
    ApiRouter.merge('/:id/:pkgname', PKGController.renamePackage);
    app.use('/api/packages', ApiRouter);
};
//# sourceMappingURL=package.js.map