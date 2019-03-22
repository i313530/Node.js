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
const SIField_1 = require("../models/SIField");
const SI_REC_1 = require("../models/SI_REC");
const record_1 = require("../models/record");
const v4_1 = __importDefault(require("uuid/v4"));
const moment_1 = __importDefault(require("moment"));
// const uuidv4 = require('uuid/v4')
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
        .select(['SI.SI_ID', 'SI.CREATED_AT', 'SI.CHANGED_AT', 'TXT.SI_NAME'])
        .from('Scopeitem', 'SI')
        .innerJoin('ScopeitemT', 'TXT', 'TXT.SI_ID = SI.SI_ID')
        .where("TXT.LANGU = 'EN'")
        .andWhere('SI.SI_ID = :siid', { siid: id })
        .getRawOne();
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
const getFields = (SIID) => __awaiter(this, void 0, void 0, function* () {
    const FLDRepo = typeorm_1.getManager().getRepository(SIField_1.SIField);
    const FLDs = yield FLDRepo.find({ SI_ID: SIID });
    return FLDs;
});
const updateField = (SIID, FLD) => __awaiter(this, void 0, void 0, function* () {
    const FLDRepo = typeorm_1.getManager().getRepository(SIField_1.SIField);
    const FLDs = yield FLDRepo.findOne({ SI_ID: SIID, FIELD: FLD.FIELD });
    return FLDs;
});
const addField = (SIID, fldid) => __awaiter(this, void 0, void 0, function* () {
    const FLDRepo = typeorm_1.getManager().getRepository(SIField_1.SIField);
    const oFLD = new SIField_1.SIField();
    oFLD.SI_ID = SIID;
    oFLD.FIELD = fldid;
    oFLD.VERSION = 'D';
    oFLD.VISIBILITY = false;
    const SIRepo = typeorm_1.getManager().getRepository(SI_1.Scopeitem);
    const oSI = yield SIRepo.findOne({ SI_ID: SIID });
    oSI.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    yield SIRepo.save(oSI);
    yield FLDRepo.save(oFLD);
    return oFLD;
});
const getrecords = (SIID) => __awaiter(this, void 0, void 0, function* () {
    const RecRepo = typeorm_1.getManager().getRepository(SI_REC_1.SIRec);
    const Recs = yield RecRepo.find({ SI_ID: SIID });
    return Recs;
});
const createNewRec = (SIID) => __awaiter(this, void 0, void 0, function* () {
    const RecRepo = typeorm_1.getManager().getRepository(record_1.Record);
    const SiRecRepo = typeorm_1.getManager().getRepository(SI_REC_1.SIRec);
    const oRec = new record_1.Record();
    const oSiRec = new SI_REC_1.SIRec();
    const SIRepo = typeorm_1.getManager().getRepository(SI_1.Scopeitem);
    const oSI = yield SIRepo.findOne({ SI_ID: SIID });
    oSI.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    oSiRec.REC_ID = oRec.REC_ID = v4_1.default();
    oSiRec.VERSION = oRec.VERSION = 'D';
    oSiRec.SI_ID = SIID;
    oSI.CHANGED_AT = oSiRec.CREATED_AT = oRec.CREATED_AT = oRec.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    try {
        Promise.all([RecRepo.save(oRec), SiRecRepo.save(oSiRec), SIRepo.save(oSI)]);
        return oSiRec;
    }
    catch (err) {
        return false;
    }
});
exports.default = {
    getSIs,
    addSI,
    removeSI,
    getOneSI,
    getFields,
    addField,
    getrecords,
    createNewRec,
    updateField
};
//# sourceMappingURL=SI.js.map