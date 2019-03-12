"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const si_1 = require("../models/si");
const getSI = () => __awaiter(this, void 0, void 0, function* () {
    const SIRepo = typeorm_1.getManager().getRepository(si_1.Scopeitem);
    return SIRepo.find();
});
const addSI = (SI_ID, VERSION) => __awaiter(this, void 0, void 0, function* () {
    const SIRepo = typeorm_1.getManager().getRepository(si_1.Scopeitem);
    const oScopeitem = new si_1.Scopeitem();
    oScopeitem.SI_ID = SI_ID;
    if (VERSION === null) {
        oScopeitem.VERSION = 'D';
    }
    else {
        oScopeitem.VERSION = VERSION;
    }
    return SIRepo.save(oScopeitem);
});
const removeSI = (SI_ID) => __awaiter(this, void 0, void 0, function* () {
    const SIRepo = typeorm_1.getManager().getRepository(si_1.Scopeitem);
    const oScopeitem = yield SIRepo.findOne(SI_ID);
    return SIRepo.remove(oScopeitem);
});
exports.default = {
    getSI,
    addSI,
    removeSI
};
//# sourceMappingURL=SI.js.map