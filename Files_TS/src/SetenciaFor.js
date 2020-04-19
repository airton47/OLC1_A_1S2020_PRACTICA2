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
var SentenciaFor = /** @class */ (function (_super) {
    __extends(SentenciaFor, _super);
    function SentenciaFor(variable, valor, condicion, lista) {
        var _this = _super.call(this) || this;
        _this.valor = valor;
        _this.varible = variable;
        _this.condicion = condicion;
        var sp = _this.condicion.split("<");
        _this.delimitador = sp[1];
        if (lista != undefined) {
            _this.sentencias = lista;
        }
        else {
            _this.sentencias = new Array();
        }
        return _this;
    }
    SentenciaFor.prototype.printSentencia = function () {
        this.cuerpo = '\nfor ' + this.varible + ' in range(' + this.valor + ',' + this.delimitador + ')';
        var size = this.sentencias.length;
        for (var i = 0; i < size; i++) {
            this.cuerpo += '\n\t' + this.sentencias[i].printSentencia();
        }
        return this.cuerpo;
    };
    SentenciaFor.prototype.getNumber = function (cad) {
        var numero = 0;
        var aux = cad.charCodeAt(0);
        if (aux > 48 && aux < 52) {
            aux = aux + 1;
            numero = aux;
        }
        return numero;
    };
    return SentenciaFor;
}(Sentencia_1.default));
module.exports = SentenciaFor;
