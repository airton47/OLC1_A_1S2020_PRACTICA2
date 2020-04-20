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
    function SentenciaIF(c, lista, listifs) {
        var _this = _super.call(this) || this;
        if (c != undefined) {
            _this.condicion = c;
        }
        else {
            _this.condicion = "";
        }
        if (lista != undefined) {
            _this.listaSentencias = lista;
        }
        else {
            _this.listaSentencias = new Array();
        }
        if (listifs != undefined) {
            _this.listaIfs = listifs;
        }
        return _this;
    }
    SentenciaIF.prototype.printSentencia = function () {
        this.cuerpo = "if " + this.condicion + " :";
        var size = this.listaSentencias.length;
        for (var i = 0; i < size; i++) {
            this.cuerpo += "\n\t" + this.listaSentencias[i].printSentencia();
        }
        if (this.listaIfs != undefined) {
            size = this.listaIfs.length;
            var ifactual = void 0;
            for (var i = 0; i < size; i++) {
                ifactual = this.listaIfs[i];
                if (ifactual.condicion == "") {
                    this.cuerpo += "\nelse " + ifactual.condicion + " :";
                }
                else {
                    this.cuerpo += "\nelif " + ifactual.condicion + " :";
                }
                if (ifactual.listaSentencias != undefined) {
                    var size1 = ifactual.listaSentencias.length;
                    for (var i_1 = 0; i_1 < size1; i_1++) {
                        this.cuerpo += "\n\t" + ifactual.listaSentencias[i_1].printSentencia();
                    }
                }
            }
        }
        return this.cuerpo;
    };
    return SentenciaIF;
}(Sentencia_1.default));
module.exports = SentenciaIF;
