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
const PkgSiA_1 = require("../models/PkgSiA");
const getPKGSIA = (PKGID) => __awaiter(this, void 0, void 0, function* () {
    const PKGSIARepo = typeorm_1.getManager().getRepository(PkgSiA_1.PkgSiAssign);
    return PKGSIARepo.find({ PKG_ID: PKGID, VERSION: 'D' });
});
const addPKGSIA = (PKG_ID, SI_ID, VERSION) => __awaiter(this, void 0, void 0, function* () {
    const PKGSIARepo = typeorm_1.getManager().getRepository(PkgSiA_1.PkgSiAssign);
    const oPkgSiA = new PkgSiA_1.PkgSiAssign();
    oPkgSiA.PKG_ID = PKG_ID;
    oPkgSiA.SI_ID = SI_ID;
    oPkgSiA.VERSION = VERSION;
    return PKGSIARepo.save(oPkgSiA);
});
const removePKGSIA = (PKGID, SIID) => __awaiter(this, void 0, void 0, function* () {
    const PKGRepo = typeorm_1.getManager().getRepository(PkgSiA_1.PkgSiAssign);
    const oPkgSiA = yield PKGRepo.findOne({ PKG_ID: PKGID, SI_ID: SIID });
    return PKGRepo.remove(oPkgSiA);
});
exports.default = {
    getPKGSIA,
    addPKGSIA,
    removePKGSIA
};
//# sourceMappingURL=pkgsiA.js.map