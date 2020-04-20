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
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(name, tipo, linea, valor) {
        var _this = _super.call(this) || this;
        _this.tipo = tipo;
        _this.linea = linea;
        _this.nombre = name;
        if (valor != undefined) {
            _this.expresion = valor;
        }
        else {
            _this.expresion = "";
        }
        return _this;
    }
    Declaracion.prototype.isEXpDefined = function () {
        if (this.expresion == undefined || this.expresion == "") {
            return false;
        }
        else {
            return true;
        }
    };
    Declaracion.prototype.printSentencia = function () {
        this.cuerpo = "var " + this.nombre;
        if (this.isEXpDefined()) {
            this.cuerpo += " : ";
            this.cuerpo += this.expresion;
        }
        //console.log(this.cuerpo);
        return this.cuerpo;
    };
    return Declaracion;
}(Sentencia_1.default));
module.exports = Declaracion;
