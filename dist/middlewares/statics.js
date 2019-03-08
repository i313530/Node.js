"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const compression_1 = __importDefault(require("compression"));
const express = __importStar(require("express"));
exports.default = (app) => {
    // Should be placed before express.static
    app.use(compression_1.default());
    app.use('/ui', express.static(path_1.default.resolve('./ui'), {
    // maxAge: 1000*60*60 //*24*365
    }));
};
//# sourceMappingURL=statics.js.map