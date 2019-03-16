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
const typeorm_1 = require("typeorm");
const SI_1 = require("../models/SI");
const SIT_1 = require("../models/SIT");
const moment_1 = __importDefault(require("moment"));
const getSIs = () => __awaiter(this, void 0, void 0, function* () {
    const selectSI = yield typeorm_1.getConnection()
        .createQueryBuilder()
        .select(['SI.SI_ID', 'SI.CREATED_AT', 'TXT.SI_NAME'])
        .from('Scopeitem', 'SI')
        .innerJoin('ScopeitemT', 'TXT', 'TXT.SI_ID = SI.SI_ID')
        // .where('PKGT.LANGU = EN')
        .orderBy('SI.SI_ID')
        .getRawMany();
    return selectSI;
});
const getOneSI = (id) => __awaiter(this, void 0, void 0, function* () {
    const selectSI = yield typeorm_1.getConnection()
        .createQueryBuilder()
        .select(['SI.SI_ID', 'SI.CREATED_AT', 'TXT.SI_NAME'])
        .from('Scopeitem', 'SI')
        .innerJoin('ScopeitemT', 'TXT', 'TXT.SI_ID = SI.SI_ID')
        .where("TXT.LANGU = 'EN'")
        .andWhere('SI.SI_ID = :siid', { siid: id })
        .getRawMany();
    return selectSI;
});
const addSI = (SI_ID, VERSION, SI_NAME) => __awaiter(this, void 0, void 0, function* () {
    const SIRepo = typeorm_1.getManager().getRepository(SI_1.Scopeitem);
    const SITRepo = typeorm_1.getManager().getRepository(SIT_1.ScopeitemT);
    const oSI = new SI_1.Scopeitem();
    const oSIT = new SIT_1.ScopeitemT();
    oSIT.SI_ID = oSI.SI_ID = SI_ID;
    if (VERSION === null) {
        oSIT.VERSION = oSI.VERSION = 'D';
    }
    else {
        oSIT.VERSION = oSI.VERSION = VERSION;
    }
    oSI.CREATED_AT = oSI.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    oSIT.SI_NAME = SI_NAME;
    oSIT.LANGU = 'EN';
    yield Promise.all([SIRepo.save(oSI), SITRepo.save(oSIT)]);
    const SIoutput = {
        SI_SI_ID: oSI.SI_ID,
        SI_CREATED_AT: oSI.CREATED_AT,
        TXT_SI_NAME: oSIT.SI_NAME
    };
    return SIoutput;
});
const removeSI = (SIID) => __awaiter(this, void 0, void 0, function* () {
    // console.log(PKGID)
    const SIRepo = typeorm_1.getManager().getRepository(SI_1.Scopeitem);
    const oSI = yield SIRepo.findOne({ SI_ID: SIID });
    const SITRepo = typeorm_1.getManager().getRepository(SIT_1.ScopeitemT);
    const oSIT = yield SITRepo.find({ SI_ID: SIID });
    yield SIRepo.remove(oSI);
    yield SITRepo.remove(oSIT);
});
exports.default = {
    getSIs,
    addSI,
    removeSI,
    getOneSI
};
//# sourceMappingURL=SI.js.map