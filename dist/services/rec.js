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
const record_1 = require("../models/record");
const reccell_1 = require("../models/reccell");
const getRecdata = (ID) => __awaiter(this, void 0, void 0, function* () {
    const RecRepo = typeorm_1.getManager().getRepository(reccell_1.RecCell);
    const Recdata = yield RecRepo.find({ REC_ID: ID });
    return Recdata;
});
const deleteRec = (ID) => __awaiter(this, void 0, void 0, function* () {
    const RecRepo = typeorm_1.getManager().getRepository(record_1.Record);
    // const Recs = await RecRepo.find({ SI_ID: SIID })
    // return Recs
});
const updateRec = (ID) => __awaiter(this, void 0, void 0, function* () {
    const RecRepo = typeorm_1.getManager().getRepository(reccell_1.RecCell);
    const Recdata = yield RecRepo.find({ REC_ID: ID });
    return Recdata;
});
exports.default = {
    getRecdata,
    deleteRec,
    updateRec
};
//# sourceMappingURL=rec.js.map