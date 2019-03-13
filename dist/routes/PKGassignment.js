"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiRouter = express_1.Router();
exports.default = (app) => {
    ApiRouter.get('/', PKGController.getPackages);
    ApiRouter.post('/', PKGController.addPackage);
    ApiRouter.delete('/:id', PKGController.removePackage);
    ApiRouter.get('/:id', PKGController.getOnePackage);
    ApiRouter.put('/:id/:pkgname', PKGController.renamePackage);
    app.use('/api/packageA', ApiRouter);
};
//# sourceMappingURL=PKGassignment.js.map