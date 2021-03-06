"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// import { PackageT } from './packageT'
let Record = class Record {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 40 }),
    __metadata("design:type", String)
], Record.prototype, "REC_ID", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 2 }),
    __metadata("design:type", String)
], Record.prototype, "VERSION", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 40, nullable: true }),
    __metadata("design:type", String)
], Record.prototype, "KEY_HASH", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Record.prototype, "PRIMKEY", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 20, nullable: true }),
    __metadata("design:type", String)
], Record.prototype, "OWNER", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 20, nullable: true }),
    __metadata("design:type", String)
], Record.prototype, "CREATED_BY", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp' }),
    __metadata("design:type", String)
], Record.prototype, "CREATED_AT", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 20, nullable: true }),
    __metadata("design:type", String)
], Record.prototype, "CHANGED_BY", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", String)
], Record.prototype, "CHANGED_AT", void 0);
Record = __decorate([
    typeorm_1.Entity()
], Record);
exports.Record = Record;
//# sourceMappingURL=record.js.map