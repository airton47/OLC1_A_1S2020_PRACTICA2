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
var Return = /** @class */ (function (_super) {
    __extends(Return, _super);
    function Return(vl) {
        var _this = _super.call(this) || this;
        if (vl != undefined) {
            _this.valor = vl;
        }
        return _this;
    }
    Return.prototype.printSentencia = function () {
        this.cuerpo = "\nreturn ";
        if (this.valor != undefined) {
            this.cuerpo += this.valor;
        }
        //console.log(this.cuerpo);
        return this.cuerpo;
    };
    return Return;
}(Sentencia_1.default));
module.exports = Return;
