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
var SentenciaCase = /** @class */ (function (_super) {
    __extends(SentenciaCase, _super);
    function SentenciaCase(sentence, value) {
        var _this = _super.call(this) || this;
        if (value != undefined) {
            _this.valor = value;
        }
        else {
            _this.valor = "";
        }
        _this.sentencia = sentence;
        return _this;
    }
    SentenciaCase.prototype.printSentencia = function () {
        this.cuerpo = '\n' + this.valor + ':' + this.sentencia.printSentencia() + ',';
        return this.cuerpo;
    };
    return SentenciaCase;
}(Sentencia_1.default));
module.exports = SentenciaCase;
