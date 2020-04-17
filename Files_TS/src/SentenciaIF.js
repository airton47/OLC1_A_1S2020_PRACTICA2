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
var SentenciaIF = /** @class */ (function (_super) {
    __extends(SentenciaIF, _super);
    function SentenciaIF(c, lista) {
        var _this = _super.call(this) || this;
        _this.condicion = c;
        if (lista != undefined) {
            _this.listaSentecias = lista;
        }
        else {
            _this.listaSentecias = new Array();
        }
        return _this;
    }
    SentenciaIF.prototype.printSentencia = function () {
        this.cuerpo = "\nif " + this.condicion[0] + " :\n";
        var size = this.listaSentecias.length;
        for (var i = 1; i < size; i++) {
            this.cuerpo += "\t" + this.listaSentecias[i].printSentencia();
        }
        return this.cuerpo;
    };
    return SentenciaIF;
}(Sentencia_1.default));
module.exports = SentenciaIF;
