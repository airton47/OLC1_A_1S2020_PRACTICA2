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
var MetodoMain = /** @class */ (function (_super) {
    __extends(MetodoMain, _super);
    function MetodoMain(sentencias) {
        var _this = _super.call(this) || this;
        if (sentencias != undefined) {
            _this.addList(sentencias);
        }
        return _this;
    }
    MetodoMain.prototype.printSentencia = function () {
        this.cuerpo = "\ndef " + "main(";
        this.cuerpo += "):\n";
        var size = 0;
        size = this.listaSentencias.length;
        for (var i = 0; i < size; i++) {
            this.cuerpo += "\t" + this.listaSentencias[i].printSentencia() + "";
        }
        this.cuerpo += '\nif __name__="__main__":\n';
        this.cuerpo += '\tmain()\n';
        //console.log(this.cuerpo);
        return this.cuerpo;
    };
    return MetodoMain;
}(Procedimiento_1.default));
var varr = new MetodoMain();
if (varr instanceof Procedimiento_1.default) {
    console.log("El objeto varr es un instancia de la clase Procedimiento, por lo tanto implementa a Sentencia Interface");
}
console.log(varr.printSentencia());
module.exports = MetodoMain;
