"use strict";
var Token_1 = require("./Token");
var AnalizadorLexico = /** @class */ (function () {
    function AnalizadorLexico() {
        this.auxLex = "";
        this.estado = 0;
        this.salida_consola = "\n";
    }
    AnalizadorLexico.prototype.AnalizdorLexico = function (entrada) {
        this.entrada = entrada;
        this.lista = new Array();
    };
    AnalizadorLexico.prototype.AnalizadorLexico = function () {
        this.entrada = "";
        this.lista = new Array();
    };
    AnalizadorLexico.prototype.analizar = function (texto) {
        texto += "#";
        this.entrada = texto;
        var linea = 0;
        var columna = 0;
        var colaux = 0;
        var size = this.entrada.length;
        this.estado = 0;
        for (var i = 0; i < size; i++) {
            var chr = this.entrada.charAt(i); //Caracter actual obtenido por indice
            columna++; //numero de columna actual
            switch (this.estado) {
                case 0:
                    if (chr == "(") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_PARENTESISIZQ, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }
                    else if (chr == ")") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_PARENTESISDER, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }
                    else if (chr == "{") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_LLAVEIZQ, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }
                    else if (chr == "}") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_LLAVEDER, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }
                    else if (chr == ",") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_COMA, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }
                    else if (chr == ";") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_PUNTOYCOMA, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }
                    else if (chr == "+") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_MAS, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }
                    else if (chr == "-") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_MENOS, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }
                    else if (chr == "*") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_MULTIPLICACION, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }
                    else if (chr == "!") {
                        this.auxLex += chr;
                        this.estado = 1;
                    }
                    else if (chr == "/") {
                        this.auxLex += chr;
                        this.estado = 2;
                    }
                    else if (chr == "<") {
                        this.auxLex += chr;
                        this.estado = 4;
                    }
                    else if (chr == ">") {
                        this.auxLex += chr;
                        this.estado = 5;
                    }
                    else if (chr == "=") {
                        this.auxLex += chr;
                        this.estado = 6;
                    }
                    else if (this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 9;
                    }
                    else if (this.isLetter(chr)) {
                        this.auxLex += chr;
                        this.estado = 11;
                    }
                    else if (chr == "\"") {
                        this.auxLex += chr;
                        this.estado = 12;
                    }
                    else if (chr == "#" && i == size - 1) {
                        this.writeSalida("*********El analisis lexico de la entrada ha finalizado*********");
                    }
                    else if (chr == "\n" || chr == "\t" || chr == "\r" || chr == " ") {
                        if (chr == "\t" || chr == "\r") {
                            linea++;
                            columna = 0;
                        }
                        this.estado = 0;
                    }
                    else {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.ERROR, this.auxLex, linea, columna);
                        this.writeSalida("Se he encontrado une error lexico en la entrada" + this.auxLex);
                    }
                    break;
                case 1:
                    ; //Estado para reconocer un operador de 'direrente de' !=
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_DIFERENTFROM, this.auxLex, linea, columna);
                    }
                    else {
                        this.addToken(Token_1.TipoToken.ERROR, this.auxLex, linea, columna);
                        i = i - 1;
                    }
                    break;
                case 2:
                    if (chr == "/") {
                        this.auxLex += chr;
                        this.estado = 3;
                        colaux = columna;
                    }
                    else if (chr == "*") {
                        this.auxLex += chr;
                        this.estado = 7;
                    }
                    else {
                        this.addToken(Token_1.TipoToken.SYM_DIVISION, this.auxLex, linea, columna);
                        i = i - 1;
                    }
                    break;
                case 3:
                    if (chr != "\n") {
                        this.auxLex += chr;
                        this.estado = 3;
                    }
                    else {
                        this.addToken(Token_1.TipoToken.COMENTARIO_SL, this.auxLex, linea, colaux, true);
                        this.writeSalida("Se ha encontrado Token Comentario: " + this.auxLex);
                        linea++;
                        columna = 0;
                    }
                    break;
                case 4:
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_MENORIGUAL, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    }
                    else {
                        this.addToken(Token_1.TipoToken.SYM_MENORQUE, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        i = i - 1;
                    }
                    break;
                case 5:
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_MENORIGUAL, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    }
                    else {
                        this.addToken(Token_1.TipoToken.SYM_MAYORQUE, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        i = i - 1;
                    }
                    break;
                case 6:
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_COMPARACION, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    }
                    else {
                        this.addToken(Token_1.TipoToken.SYM_IGUAL, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        i = i - 1;
                    }
                    break;
                case 7:
                    if (chr != "*") {
                        this.auxLex += chr;
                        this.estado = 7;
                        if (chr == "\n" || chr == "\r") {
                            linea++;
                            columna = 0;
                        }
                    }
                    else {
                        this.auxLex += chr;
                        this.estado = 8;
                    }
                    break;
                case 8:
                    if (chr == "/") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.COMENTARIO_ML, this.auxLex, linea, colaux);
                        this.writeSalida("Se ha encontrado Token Comentario multilina: " + this.auxLex);
                    }
                    else {
                        this.auxLex += chr;
                        this.estado = 7;
                        if (chr == "\n" || chr == "\r") {
                            linea++;
                            columna = 0;
                        }
                    }
                    break;
                case 9:
                    if (this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 9;
                    }
                    else if (chr == ".") {
                        this.auxLex += chr;
                        this.estado = 10;
                    }
                    else {
                        this.addToken(Token_1.TipoToken.NUMERO, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        i = i - 1;
                    }
                    break;
                case 10:
                    if (this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 10;
                    }
                    else {
                        this.addToken(Token_1.TipoToken.NUMERO, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        i = i - 1;
                    }
                    break;
                case 11:
                    if (this.isLetter(chr) || chr == "_" || this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 11;
                    }
                    else {
                        this.addToken(Token_1.TipoToken.IDENTIFICADOR, this.auxLex, linea, columna);
                        i = i - 1;
                    }
                    break;
                case 12:
                    if (chr != "\"") {
                        this.auxLex += chr;
                        this.estado = 12;
                        if (chr == "\n" || chr == "\r") {
                            linea++;
                            columna = 0;
                        }
                    }
                    else {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.CADENA_SIMPLE, this.auxLex, linea, colaux, true);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    }
                    break;
                case 13:
                    break;
                case 14:
                    break;
            }
        }
    };
    AnalizadorLexico.prototype.isLetter = function (char) {
        var valor = char.charCodeAt(0);
        if (valor > 64 && valor < 91) {
            return true;
        }
        else {
            return false;
        }
    };
    AnalizadorLexico.prototype.isDigit = function (char) {
        if (char == "1" || char == "2" || char == "3" || char == "4" || char == "5" || char == "6" || char == "7" || char == "8" || char == "9" || char == "0") {
            return true;
        }
        else {
            return false;
        }
    };
    AnalizadorLexico.prototype.addToken = function (tipo, lexema, line, col, flag) {
        var _a;
        if (flag == undefined) {
            col = col - lexema.length;
        }
        (_a = this.lista) === null || _a === void 0 ? void 0 : _a.push(new Token_1.Token(tipo, lexema, line, col));
        this.auxLex = "";
        this.estado = 0;
    };
    AnalizadorLexico.prototype.writeSalida = function (mensaje) {
        console.log(mensaje);
        this.salida_consola += "\n" + mensaje;
    };
    return AnalizadorLexico;
}());
module.exports = AnalizadorLexico;
