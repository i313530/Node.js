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
const pkg_1 = __importDefault(require("../services/pkg"));
/* API Controllers */
exports.getPackages = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const packages = yield pkg_1.default.getPKG();
        console.log(packages);
        res.json(packages);
    }
    catch (err) {
        // console.log(err)
        res.status(500);
        res.send(err);
    }
});
exports.addPackage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const pkgid = req.body.PKG_ID;
        const pkgname = req.body.PKG_NAME;
        const oPackage = yield pkg_1.default.addPKG(pkgid, null, pkgname);
        res.json(oPackage);
    }
    catch (err) {
        // console.log(err)
        res.status(500);
        res.send(err);
    }
});
exports.removePackage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield pkg_1.default.removePKG(id);
        res.send('ok');
    }
    catch (err) {
        // console.log(err)
        res.status(500);
        res.send(err);
    }
});
exports.renamePackage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pkgname = req.params.pkgname;
        yield pkg_1.default.renamePKG(id, pkgname);
        res.send('ok');
    }
    catch (err) {
        // console.log(err)
        res.status(500);
        res.send(err);
    }
});
//# sourceMappingURL=package.js.map