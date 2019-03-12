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
const package_1 = require("../models/package");
const packageT_1 = require("../models/packageT");
const moment_1 = __importDefault(require("moment"));
// let oPKGout = {
//   id: string,
//   name: string
// }
// let oPKG_arr:Array<oPKGout>
/*
const a = _.map(data, el => {
  return { id: el.PKG_ID, name: '' }
})
*/
const getPKG = () => __awaiter(this, void 0, void 0, function* () {
    // const PKGRepo = getManager().getRepository(Package)
    const selectPKG = yield typeorm_1.getConnection()
        .createQueryBuilder(package_1.Package, 'PKG')
        .select('PKG.PKG_ID')
        .addSelect('TXT.PKG_NAME')
        .addSelect('PKG.CREATED_AT')
        .innerJoinAndSelect(packageT_1.PackageT, 'TXT', 'TXT.PKG_ID = PKG.PKG_ID')
        .orderBy('PKG.PKG_ID')
        .getMany();
    // console.log(selectPKG)
    // const data: any[] = await PKGRepo.find()
    // return _.map(data, output => {
    //   return { id: output.PKG_ID, name: '' }
    // })
    return selectPKG;
});
const addPKG = (PKG_ID, VERSION, PKG_NAME) => __awaiter(this, void 0, void 0, function* () {
    const PKGRepo = typeorm_1.getManager().getRepository(package_1.Package);
    const PKGTRepo = typeorm_1.getManager().getRepository(packageT_1.PackageT);
    const oPackage = new package_1.Package();
    const oPackageT = new packageT_1.PackageT();
    oPackageT.PKG_ID = oPackage.PKG_ID = PKG_ID;
    if (VERSION === null) {
        oPackageT.VERSION = oPackage.VERSION = 'D';
    }
    else {
        oPackageT.VERSION = oPackage.VERSION = VERSION;
    }
    oPackage.CREATED_AT = oPackage.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    oPackageT.PKG_NAME = PKG_NAME;
    oPackageT.LANGU = 'EN';
    yield Promise.all([PKGRepo.save(oPackage), PKGTRepo.save(oPackageT)]);
});
const removePKG = (PKGID) => __awaiter(this, void 0, void 0, function* () {
    const PKGRepo = typeorm_1.getManager().getRepository(package_1.Package);
    const oPackag = yield PKGRepo.findOne(PKGID);
    const PKGTRepo = typeorm_1.getManager().getRepository(packageT_1.PackageT);
    const oPackagT = yield PKGTRepo.find({ PKG_ID: PKGID });
    yield PKGRepo.remove(oPackag);
    yield PKGTRepo.remove(oPackagT);
});
const renamePKG = (PKG_ID, name) => __awaiter(this, void 0, void 0, function* () {
    const PKGRepo = typeorm_1.getManager().getRepository(package_1.Package);
    const oPackag = yield PKGRepo.findOne(PKG_ID);
    const PKGTRepo = typeorm_1.getManager().getRepository(packageT_1.PackageT);
    const oPackagT = yield PKGTRepo.findOne(PKG_ID);
    oPackagT.LANGU = 'EN';
    oPackagT.PKG_NAME = name;
    yield PKGTRepo.save(oPackagT);
    oPackag.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    yield PKGRepo.save(oPackag);
});
exports.default = {
    getPKG,
    addPKG,
    renamePKG,
    removePKG
};
//# sourceMappingURL=pkg.js.map