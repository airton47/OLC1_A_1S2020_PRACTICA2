"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Sentencia_1 = __importDefault(require("./Sentencia"));
var SentenciaSwitch = /** @class */ (function (_super) {
    __extends(SentenciaSwitch, _super);
    function SentenciaSwitch(variable) {
        var _this = _super.call(this) || this;
        _this.variable = variable;
        return _this;
    }
    SentenciaSwitch.prototype.printSentencia = function () {
        this.cuerpo = '\ndef switcher(' + this.variable + '):';
        return this.cuerpo;
    };
    return SentenciaSwitch;
}(Sentencia_1.default));
module.exports = SentenciaSwitch;
