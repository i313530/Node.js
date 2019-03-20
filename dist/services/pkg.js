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
    // const pkgfull = {PKG_ID:String, CREATED_AT: String, PKG_NAME: String}
    const selectPKG = yield typeorm_1.getConnection()
        .createQueryBuilder()
        .select(['PKG.PKG_ID', 'PKG.CREATED_AT', 'TXT.PKG_NAME'])
        // .addSelect('PKG.CREATED_AT')
        // .addSelect('TXT.PKG_NAME')
        .from('Package', 'PKG')
        .innerJoin('PackageT', 'TXT', 'TXT.PKG_ID = PKG.PKG_ID')
        // .where('PKGT.LANGU = EN')
        .orderBy('PKG.PKG_ID')
        .getRawMany();
    // console.log(selectPKG)
    // const data: any[] = await PKGRepo.find()
    // return _.map(data, output => {
    //   return { id: output.PKG_ID, name: '' }
    // })
    return selectPKG;
});
const PKGHead = (ID) => __awaiter(this, void 0, void 0, function* () {
    const selectPKG = yield typeorm_1.getConnection()
        .createQueryBuilder()
        .select([
        'PKG.PKG_ID',
        'PKG.COMPLETION',
        'PKG.OutOfScope',
        'PKG.Type',
        'PKG.CREATED_AT',
        'PKG.CHANGED_AT',
        'TXT.PKG_NAME'
    ])
        .from('Package', 'PKG')
        .innerJoin('PackageT', 'TXT', 'TXT.PKG_ID = PKG.PKG_ID')
        .where('PKG.PKG_ID = :id', { id: ID })
        .getRawOne();
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
    oPackage.OutOfScope = false;
    oPackage.CREATED_AT = oPackage.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    oPackageT.PKG_NAME = PKG_NAME;
    oPackageT.LANGU = 'EN';
    yield Promise.all([PKGRepo.save(oPackage), PKGTRepo.save(oPackageT)]);
    const PKGoutput = {
        PKG_PKG_ID: oPackage.PKG_ID,
        PKG_CREATED_AT: oPackage.CREATED_AT,
        TXT_PKG_NAME: oPackageT.PKG_NAME
    };
    return PKGoutput;
});
const removePKG = (PKGID) => __awaiter(this, void 0, void 0, function* () {
    // console.log(PKGID)
    const PKGRepo = typeorm_1.getManager().getRepository(package_1.Package);
    const oPackag = yield PKGRepo.findOne({ PKG_ID: PKGID });
    const PKGTRepo = typeorm_1.getManager().getRepository(packageT_1.PackageT);
    const oPackagT = yield PKGTRepo.find({ PKG_ID: PKGID });
    yield PKGRepo.remove(oPackag);
    yield PKGTRepo.remove(oPackagT);
});
const renamePKG = (PKGID, name, Langu) => __awaiter(this, void 0, void 0, function* () {
    const PKGRepo = typeorm_1.getManager().getRepository(package_1.Package);
    const oPackag = yield PKGRepo.findOne({ PKG_ID: PKGID });
    const PKGTRepo = typeorm_1.getManager().getRepository(packageT_1.PackageT);
    const oPackagT = yield PKGTRepo.findOne({ PKG_ID: PKGID });
    switch (Langu) {
        case 'en-US':
            oPackagT.LANGU = 'EN';
            break;
        case 'zh-CN':
            oPackagT.LANGU = 'CN';
            break;
    }
    oPackagT.PKG_NAME = name;
    // PKGTRepo.update()
    yield PKGTRepo.save(oPackagT);
    oPackag.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    yield PKGRepo.save(oPackag);
});
const savePackage = (PKG) => __awaiter(this, void 0, void 0, function* () {
    const PKGRepo = typeorm_1.getManager().getRepository(package_1.Package);
    const oPackage = yield PKGRepo.findOne({ PKG_ID: PKG.PKG_ID });
    // _.forEach(PKG,function(value,key){
    //   oPackag[key] = value
    // })
    oPackage.COMPLETION = PKG.COMPLETION;
    oPackage.OutOfScope = PKG.OutOfScope;
    oPackage.Type = PKG.Type;
    oPackage.CHANGED_AT = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
    yield PKGRepo.save(oPackage);
});
class InputPKG {
}
exports.default = {
    getPKG,
    PKGHead,
    addPKG,
    renamePKG,
    removePKG,
    savePackage
};
//# sourceMappingURL=pkg.js.map