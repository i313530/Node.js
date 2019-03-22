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
const SI_1 = __importDefault(require("../services/SI"));
/* API Controllers */
exports.getScopeitems = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const Scopeitems = yield SI_1.default.getSIs();
        res.json(Scopeitems);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
exports.getOneSI = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const SIid = req.params.id;
        const Scopeitems = yield SI_1.default.getOneSI(SIid);
        res.json(Scopeitems);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
exports.addScopeitem = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const SIid = req.body.SI_ID;
        const SIname = req.body.SI_NAME;
        const oSI = yield SI_1.default.addSI(SIid, null, SIname);
        res.json(oSI);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
exports.removeScopeitem = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield SI_1.default.removeSI(id);
        res.send('ok');
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
exports.getFields = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const oField = yield SI_1.default.getFields(id);
        res.json(oField);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
//# sourceMappingURL=SI.js.map