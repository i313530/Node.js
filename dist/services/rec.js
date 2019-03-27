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
const record_1 = require("../models/record");
const reccell_1 = require("../models/reccell");
const RecData_1 = require("../models/RecData");
const SIField_1 = require("../models/SIField");
const lodash_1 = __importDefault(require("lodash"));
const getRecdata = (ID) => __awaiter(this, void 0, void 0, function* () {
    const RecData = new RecData_1.RecordOutput();
    const RecRepo = typeorm_1.getManager().getRepository(record_1.Record);
    const oRec = yield RecRepo.findOne({ REC_ID: ID });
    lodash_1.default.assignIn(RecData, oRec);
    const cellRepo = typeorm_1.getManager().getRepository(reccell_1.RecCell);
    const Reccells = yield cellRepo.find({ REC_ID: ID });
    RecData.cells = Reccells;
    console.log(RecData);
    return RecData;
});
const deleteRec = (ID) => __awaiter(this, void 0, void 0, function* () {
    const RecRepo = typeorm_1.getManager().getRepository(record_1.Record);
    // const Recs = await RecRepo.find({ SI_ID: SIID })
    // return Recs
});
const upsertRecdata = (SIID, data) => __awaiter(this, void 0, void 0, function* () {
    const FLDRepo = typeorm_1.getManager().getRepository(SIField_1.SIField);
    const FLDs = yield FLDRepo.find({ SI_ID: SIID });
    data.forEach((rec) => __awaiter(this, void 0, void 0, function* () {
        const CellRepo = typeorm_1.getManager().getRepository(reccell_1.RecCell);
        const Cells = yield getCell(rec.REC_ID);
        const inputCells = rec.cells;
        lodash_1.default.forEach(FLDs, (FLD) => {
            const indexofDBcell = lodash_1.default.findIndex(Cells, { 'FLD_ID': FLD.FIELD });
            const indexofInputcell = lodash_1.default.findIndex(inputCells, { 'FLD_ID': FLD.FIELD });
            if (indexofDBcell === -1) {
                const newCell = new reccell_1.RecCell();
                newCell.REC_ID = rec.REC_ID;
                newCell.VERSION = 'D';
                newCell.FLD_ID = FLD.FIELD;
                newCell.VALUE = rec.cells[indexofInputcell].VALUE;
                CellRepo.save(newCell);
            }
            else {
                Cells[indexofDBcell].VALUE = rec.cells[indexofInputcell].VALUE;
                CellRepo.save(Cells[indexofDBcell]);
            }
        });
    }));
});
const getCell = (ID) => __awaiter(this, void 0, void 0, function* () {
    const CellRepo = typeorm_1.getManager().getRepository(reccell_1.RecCell);
    const Cells = yield CellRepo.find({ REC_ID: ID });
    return Cells;
});
exports.default = {
    getRecdata,
    deleteRec,
    upsertRecdata
};
//# sourceMappingURL=rec.js.map