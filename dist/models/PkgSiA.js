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
let PkgSiAssign = class PkgSiAssign {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 40 }),
    __metadata("design:type", String)
], PkgSiAssign.prototype, "PKG_ID", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 40 }),
    __metadata("design:type", String)
], PkgSiAssign.prototype, "SI_ID", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: 'character', length: 2 }),
    __metadata("design:type", String)
], PkgSiAssign.prototype, "VERSION", void 0);
__decorate([
    typeorm_1.Column({ type: 'character', length: 40, nullable: true }),
    __metadata("design:type", String)
], PkgSiAssign.prototype, "PARENT", void 0);
__decorate([
    typeorm_1.Column({ type: 'float4' }),
    __metadata("design:type", Number)
], PkgSiAssign.prototype, "SI_ORDER", void 0);
PkgSiAssign = __decorate([
    typeorm_1.Entity()
], PkgSiAssign);
exports.PkgSiAssign = PkgSiAssign;
//# sourceMappingURL=PkgSiA.js.map