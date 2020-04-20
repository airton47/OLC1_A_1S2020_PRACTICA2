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
    function SentenciaSwitch(variable, lista) {
        var _this = _super.call(this) || this;
        _this.variable = variable;
        _this.cases = lista;
        return _this;
    }
    SentenciaSwitch.prototype.printSentencia = function () {
        this.cuerpo = '\ndef switch(' + this.variable + ',' + '):\n';
        this.cuerpo += '\tswitcher = {';
        var size = this.cases.length;
        var auxcase;
        for (var i = 0; i < size; i++) {
            auxcase = this.cases[i];
            if (auxcase.valor != "") {
                this.cuerpo += '\n\t' + auxcase.valor + ':' + auxcase.sentencia.printSentencia() + ',';
            }
            else {
                this.cuerpo += '\n\t' + this.getLast() + ':' + auxcase.sentencia.printSentencia() + ',';
            }
        }
        this.cuerpo += '\n\t}';
        return this.cuerpo;
    };
    SentenciaSwitch.prototype.getLast = function () {
        var cad = "";
        var index = this.cases.length - 2;
        var valor_num;
        if (index > 0) {
            valor_num = this.cases[index].valor;
        }
        else {
            valor_num = '100';
        }
        var numero = parseInt(valor_num) + 1;
        cad = numero.toString();
        return cad;
    };
    return SentenciaSwitch;
}(Sentencia_1.default));
module.exports = SentenciaSwitch;
