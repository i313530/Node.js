"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const routes_1 = __importDefault(require("../routes"));
exports.default = (app) => {
    lodash_1.default.each(routes_1.default, route => {
        route(app);
    });
};
//# sourceMappingURL=routes.js.map