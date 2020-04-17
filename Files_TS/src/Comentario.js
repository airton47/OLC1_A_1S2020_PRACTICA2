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
var Comentario = /** @class */ (function (_super) {
    __extends(Comentario, _super);
    function Comentario(comentario) {
        var _this = _super.call(this) || this;
        _this.cuerpoComentario = comentario;
        return _this;
    }
    Comentario.prototype.printSentencia = function () {
        var aux = this.cuerpoComentario;
        this.cuerpo = this.cuerpoComentario;
        var size = aux.length;
        if (1 <= size - 1) {
            if (aux.charAt(0) == "/" && aux.charAt(1) == "/") {
                var longitud = this.cuerpoComentario.length;
                aux = aux.slice(2, longitud);
                this.cuerpo = "\n#" + aux;
            }
            else {
                var longitud = this.cuerpoComentario.length - 2;
                aux = aux.slice(2, longitud);
                this.cuerpo = "\n\"\"" + aux + "\"\"";
            }
        }
        //console.log(this.cuerpo);
        return this.cuerpo;
    };
    return Comentario;
}(Sentencia_1.default));
module.exports = Comentario;
