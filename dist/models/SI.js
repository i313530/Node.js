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
let Scopeitem = class Scopeitem {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 40 }),
    __metadata("design:type", String)
], Scopeitem.prototype, "SI_ID", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 2 }),
    __metadata("design:type", String)
], Scopeitem.prototype, "VERSION", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 20, nullable: true }),
    __metadata("design:type", String)
], Scopeitem.prototype, "CREATED_BY", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp' }),
    __metadata("design:type", String)
], Scopeitem.prototype, "CREATED_AT", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 20, nullable: true }),
    __metadata("design:type", String)
], Scopeitem.prototype, "CHANGED_BY", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", String)
], Scopeitem.prototype, "CHANGED_AT", void 0);
Scopeitem = __decorate([
    typeorm_1.Entity()
], Scopeitem);
exports.Scopeitem = Scopeitem;
//# sourceMappingURL=SI.js.map