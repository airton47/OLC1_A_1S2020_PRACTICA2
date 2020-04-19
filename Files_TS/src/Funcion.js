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
var Procedimiento_1 = __importDefault(require("./Procedimiento"));
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(name, listpar, listinst) {
        var _this = _super.call(this) || this;
        _this.nombre = name;
        if (listpar != undefined) {
            _this.listaParametros = listpar;
        }
        else {
            _this.listaParametros = "";
        }
        if (listinst != undefined) {
            _this.addList(listinst);
        }
        return _this;
    }
    Funcion.prototype.printSentencia = function () {
        this.cuerpo += "\ndef " + this.nombre + "(";
        var size = 0;
        this.cuerpo += this.listaParametros;
        this.cuerpo += "):\n";
        size = this.listaSentencias.length;
        for (var i = 0; i < size; i++) {
            this.cuerpo += "\t" + this.listaSentencias[i].printSentencia();
        }
        //console.log(this.cuerpo);
        return this.cuerpo;
    };
    return Funcion;
}(Procedimiento_1.default));
module.exports = Funcion;
