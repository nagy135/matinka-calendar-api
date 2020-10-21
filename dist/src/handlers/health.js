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
var typescript_rest_1 = require("typescript-rest");
var helpers_1 = require("../helpers");
var package_json_1 = require("../../package.json");
var Health = /** @class */ (function () {
    function Health() {
    }
    Health.prototype.index = function () {
        return helpers_1.resOK({
            status: 'ok',
            version: package_json_1.version,
        });
    };
    __decorate([
        typescript_rest_1.GET,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], Health.prototype, "index", null);
    Health = __decorate([
        typescript_rest_1.Path('/')
    ], Health);
    return Health;
}());
