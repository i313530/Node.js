"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_1 = __importDefault(require("./feedback"));
const package_1 = __importDefault(require("./package"));
const PKGSIA_1 = __importDefault(require("./PKGSIA"));
const UnassignSI_1 = __importDefault(require("./UnassignSI"));
const SI_1 = __importDefault(require("./SI"));
exports.default = {
    feedback: feedback_1.default,
    Package: package_1.default,
    PKGSIA: PKGSIA_1.default,
    UnassignSI: UnassignSI_1.default,
    Scopeitem: SI_1.default
};
//# sourceMappingURL=index.js.map