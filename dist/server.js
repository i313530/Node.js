"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const typeorm_1 = require("typeorm");
const errorhandler_1 = __importDefault(require("errorhandler"));
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection(); // performs connection
        app_1.default.use(errorhandler_1.default());
        app_1.default.listen(app_1.default.get('port'), () => {
            console.log('  App is running at http://localhost:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
            console.log('  Press CTRL-C to stop\n');
        });
    }
    catch (err) {
        console.error(err);
    }
}))();
//# sourceMappingURL=server.js.map