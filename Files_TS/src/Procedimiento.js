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
var Procedimiento = /** @class */ (function (_super) {
    __extends(Procedimiento, _super);
    function Procedimiento() {
        var _this = _super.call(this) || this;
        _this.listaSentencias = new Array();
        return _this;
    }
    Procedimiento.prototype.addSentencia = function (sentencia) {
        this.listaSentencias.push(sentencia);
    };
    Procedimiento.prototype.removeSentecia = function (index) {
        return this.listaSentencias.splice(index);
    };
    Procedimiento.prototype.printSentencia = function () {
        return this.cuerpo;
        //throw new Error("Method not implemented.");
    };
    Procedimiento.prototype.addList = function (list) {
        var size = list.length;
        for (var i = 0; i < size; i++) {
            this.listaSentencias.push(list[i]);
        }
    };
    return Procedimiento;
}(Sentencia_1.default));
module.exports = Procedimiento;
