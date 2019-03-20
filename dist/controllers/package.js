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
const pkgsiA_1 = __importDefault(require("../services/pkgsiA"));
/* API Controllers */
exports.getPackages = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const packages = yield pkg_1.default.getPKG();
        // console.log(packages)
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
        const pkgname = req.body.PKG_NAME;
        const Langu = req.body.LANGU;
        yield pkg_1.default.renamePKG(id, pkgname, Langu);
        res.send('ok');
    }
    catch (err) {
        // console.log(err)
        res.status(500);
        res.send(err);
    }
});
exports.getOnePackage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const oPackage = yield pkg_1.default.PKGHead(id);
        res.json(oPackage);
    }
    catch (err) {
        // console.log(err)
        res.status(500);
        res.send(err);
    }
});
exports.getAssignments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const oAssign = yield pkgsiA_1.default.getPKGSIA(id);
        res.json(oAssign);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
exports.addAssignment = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.pkgid;
        const si = req.params.siid;
        const oAssign = yield pkgsiA_1.default.addPKGSIA(id, si, null);
        res.json(oAssign);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
exports.removeAssignment = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.pkgid;
        const si = req.params.siid;
        yield pkgsiA_1.default.removePKGSIA(id, si);
        res.json('OK');
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
exports.getUnassignments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const oAssign = yield pkgsiA_1.default.getUnassignSIs(id);
        res.json(oAssign);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
exports.savePackage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const oPackage = {
            PKG_ID: req.body.PKG_ID,
            COMPLETION: req.body.COMPLETION,
            OutOfScope: req.body.OutOfScope,
            Type: req.body.Type
        };
        yield pkg_1.default.savePackage(oPackage);
        res.json(oPackage);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
});
//# sourceMappingURL=package.js.map