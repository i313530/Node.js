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
const PkgSiA_1 = require("../models/PkgSiA");
const SI_1 = require("../models/SI");
const package_1 = require("../models/package");
const moment_1 = __importDefault(require("moment"));
const SI_2 = __importDefault(require("../services/SI"));
const lodash_1 = __importDefault(require("lodash"));
const getPKGSIA = (PKGID) => __awaiter(this, void 0, void 0, function* () {
    const selectData = yield typeorm_1.getConnection()
        .createQueryBuilder()
        .select(['AG.SI_ID', 'TXT.SI_NAME'])
        .from('PkgSiAssign', 'AG')
        .innerJoin('ScopeitemT', 'TXT', 'AG.SI_ID = TXT.SI_ID')
        .where('AG.PKG_ID = :id', { id: PKGID })
        .andWhere('TXT.LANGU = :LA', { LA: 'EN' })
        // .orderBy('Assign.SI_ORDER')
        .getRawMany();
    return selectData;
});
const addPKGSIA = (PKG_ID, SI_ID, VERSION) => __awaiter(this, void 0, void 0, function* () {
    const PKGSIARepo = typeorm_1.getManager().getRepository(PkgSiA_1.PkgSiAssign);
    const oPkgSiA = new PkgSiA_1.PkgSiAssign();
    oPkgSiA.PKG_ID = PKG_ID;
    oPkgSiA.SI_ID = SI_ID;
    if (VERSION === null) {
        oPkgSiA.VERSION = 'D';
    }
    else {
        oPkgSiA.VERSION = VERSION;
    }
    oPkgSiA.SI_ORDER = yield getMax(PKG_ID);
    oPkgSiA.SI_ORDER++;
    yield PKGSIARepo.save(oPkgSiA);
    const PKGRepo = typeorm_1.getManager().getRepository(package_1.Package);
    const oPackage = yield PKGRepo.findOne({ PKG_ID: oPkgSiA.PKG_ID });
    oPackage.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    yield PKGRepo.save(oPackage);
    return oPkgSiA;
});
const getMax = (id) => __awaiter(this, void 0, void 0, function* () {
    const PKGSIARepo = typeorm_1.getManager().getRepository(PkgSiA_1.PkgSiAssign);
    const allSi = yield PKGSIARepo.find({ PKG_ID: id });
    if (allSi.length === 0) {
        return 0;
    }
    else {
        const maxline = lodash_1.default.maxBy(allSi, 'SI_ORDER');
        return maxline.SI_ORDER;
    }
});
const removePKGSIA = (PKGID, SIID) => __awaiter(this, void 0, void 0, function* () {
    const PKGARepo = typeorm_1.getManager().getRepository(PkgSiA_1.PkgSiAssign);
    const oPkgSiA = yield PKGARepo.findOne({ PKG_ID: PKGID, SI_ID: SIID });
    yield PKGARepo.remove(oPkgSiA);
    const PKGRepo = typeorm_1.getManager().getRepository(package_1.Package);
    const oPackage = yield PKGRepo.findOne({ PKG_ID: PKGID });
    oPackage.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    yield PKGRepo.save(oPackage);
    return 'OK';
});
const getUnassignSIs = (PKGID) => __awaiter(this, void 0, void 0, function* () {
    const PKGSIARepo = typeorm_1.getManager().getRepository(PkgSiA_1.PkgSiAssign);
    const Assigned = yield PKGSIARepo.find({ PKG_ID: PKGID });
    const allSis = yield getallSis();
    lodash_1.default.forEach(Assigned, d => {
        lodash_1.default.remove(allSis, n => {
            return n.SI_ID === d.SI_ID;
        });
    });
    return allSis;
});
// import { EntityManager } from "../../node_modules/typeorm/entity-manager/EntityManager";
const createNewSIandAssign = (PKGID, SI) => __awaiter(this, void 0, void 0, function* () {
    typeorm_1.getManager().transaction((TransManager) => __awaiter(this, void 0, void 0, function* () {
        const processPKG = yield TransManager.createQueryBuilder()
            .select('PKG.PKG_ID')
            .from('Package', 'PKG')
            .where('PKG.PKG_ID= :id', { id: PKGID })
            .setLock('pessimistic_write')
            .getRawOne();
        // .catch((err) =>{
        //   throw err
        // })
        yield SI_2.default.addSI(SI.SI_ID, SI.VERSION, SI.currentName);
        setTimeout(() => {
            console.log(moment_1.default());
        }, 60000);
    }));
    return 'ok';
});
const getallSis = () => __awaiter(this, void 0, void 0, function* () {
    const SIRepo = typeorm_1.getManager().getRepository(SI_1.Scopeitem);
    const allSIs = yield SIRepo.find();
    return allSIs;
});
exports.default = {
    getPKGSIA,
    addPKGSIA,
    removePKGSIA,
    getUnassignSIs,
    createNewSIandAssign
};
//# sourceMappingURL=pkgsiA.js.map