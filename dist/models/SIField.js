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
let SIField = class SIField {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 40 }),
    __metadata("design:type", String)
], SIField.prototype, "SI_ID", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 32 }),
    __metadata("design:type", String)
], SIField.prototype, "FIELD", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 2 }),
    __metadata("design:type", String)
], SIField.prototype, "VERSION", void 0);
__decorate([
    typeorm_1.Column({ type: 'int' }),
    __metadata("design:type", String)
], SIField.prototype, "DISPLAY_ORDER", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], SIField.prototype, "VISIBILITY", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 2, nullable: true }),
    __metadata("design:type", String)
], SIField.prototype, "TYPE", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 4, nullable: true }),
    __metadata("design:type", String)
], SIField.prototype, "DDTYPE", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", String)
], SIField.prototype, "DDLENG", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 30, nullable: true }),
    __metadata("design:type", String)
], SIField.prototype, "ALIAS", void 0);
SIField = __decorate([
    typeorm_1.Entity()
], SIField);
exports.SIField = SIField;
//# sourceMappingURL=SIField.js.map