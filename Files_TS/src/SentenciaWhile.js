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
var SentenciaWhile = /** @class */ (function (_super) {
    __extends(SentenciaWhile, _super);
    function SentenciaWhile(condicion, lista) {
        var _this = _super.call(this) || this;
        _this.condicion = condicion;
        if (lista != undefined) {
            _this.sentencias = lista;
        }
        else {
            _this.sentencias = new Array();
        }
        return _this;
    }
    SentenciaWhile.prototype.printSentencia = function () {
        this.cuerpo = "while " + this.condicion;
        var size = this.sentencias.length;
        for (var i = 0; i < size; i++) {
            this.cuerpo += '\n\t' + this.sentencias[i].printSentencia();
        }
        return this.cuerpo;
    };
    return SentenciaWhile;
}(Sentencia_1.default));
module.exports = SentenciaWhile;
