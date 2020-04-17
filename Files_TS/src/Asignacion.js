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
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion(name, valor) {
        var _this = _super.call(this) || this;
        _this.valor = valor;
        _this.nombre = name;
        return _this;
    }
    Asignacion.prototype.printSentencia = function () {
        this.cuerpo = "\n";
        this.cuerpo += this.nombre + " : " + this.valor;
        return this.cuerpo;
    };
    return Asignacion;
}(Sentencia_1.default));
module.exports = Asignacion;
