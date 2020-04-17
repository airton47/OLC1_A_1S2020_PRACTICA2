"use strict";
var Sentencia = /** @class */ (function () {
    function Sentencia(body) {
        this.cuerpo = "";
        if (body != undefined) {
            this.cuerpo = body;
        }
    }
    Sentencia.prototype.printSentencia = function () {
        //this.cuerpo+="\n";
        return this.cuerpo;
    };
    return Sentencia;
}());
module.exports = Sentencia;
