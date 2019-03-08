"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const morgan_1 = __importDefault(require("morgan"));
morgan_1.default.token('logTime', (req, res) => {
    return moment_1.default().format('YYYY-MM-DD HH:mm:ss');
});
const format = {
    dev: 'dev',
    manual: '[:logTime] :method :url :status :res[content-length] -:response-time ms'
};
exports.default = (app) => {
    app.use(morgan_1.default(format.manual));
};
//# sourceMappingURL=logger.js.map