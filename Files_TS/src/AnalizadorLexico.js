"use strict";
var Token_1 = require("./Token");
var AnalizadorLexico = /** @class */ (function () {
    function AnalizadorLexico(entrada) {
        this.estado = 0;
        this.salida_consola = "\n";
        if (entrada == undefined) {
            this.entrada = "";
        }
        else {
            this.entrada = entrada;
        }
        this.auxLex = "";
        this.lista = new Array();
    }
    AnalizadorLexico.prototype.analizar = function (texto) {
        var _a;
        texto += "#";
        console.log(texto);
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
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_PARENTESISIZQ, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == ")") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_PARENTESISDER, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == "{") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_LLAVEIZQ, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == "}") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_LLAVEDER, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == ":") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_DOSPUNTOS, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == ".") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_PUNTO, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == ",") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_COMA, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == ";") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_PUNTOYCOMA, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == "+") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_MAS, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == "-") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_MENOS, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == "*") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_MULTIPLICACION, this.auxLex, linea, columna);
                        this.estado = 0;
                    }
                    else if (chr == "!") {
                        this.auxLex += chr;
                        this.estado = 1;
                        colaux = columna;
                    }
                    else if (chr == "&") {
                        this.auxLex += chr;
                        this.estado = 16;
                        colaux = columna;
                    }
                    else if (chr == "|") {
                        this.auxLex += chr;
                        this.estado = 17;
                        colaux = columna;
                    }
                    else if (chr == "/") {
                        this.auxLex += chr;
                        this.estado = 2;
                        colaux = columna;
                    }
                    else if (chr == "<") {
                        this.auxLex += chr;
                        this.estado = 4;
                        colaux = columna;
                    }
                    else if (chr == ">") {
                        this.auxLex += chr;
                        this.estado = 5;
                        colaux = columna;
                    }
                    else if (chr == "=") {
                        this.auxLex += chr;
                        this.estado = 6;
                        colaux = columna;
                    }
                    else if (this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 9;
                    }
                    else if (this.isLetter(chr)) {
                        this.auxLex += chr;
                        this.estado = 11;
                    }
                    else if (chr == "_") {
                        this.auxLex += chr;
                        this.estado = 11;
                        colaux = columna;
                    }
                    else if (chr == "\"") {
                        this.auxLex += chr;
                        this.estado = 12;
                        colaux = columna;
                    }
                    else if (chr == "'") {
                        this.auxLex += chr;
                        this.estado = 13;
                        colaux = columna;
                    }
                    else if (chr == "#" && i == size - 1) {
                        this.writeSalida("*********El analisis lexico de la entrada ha finalizado*********");
                        (_a = this.lista) === null || _a === void 0 ? void 0 : _a.push(new Token_1.Token(Token_1.TipoToken.ULTIMO, "", 0, 0));
                    }
                    else if (chr == "\n" || chr == "\t" || chr == "\r" || chr == " ") {
                        if (chr == "\n") {
                            linea++;
                            columna = 0;
                        }
                        this.estado = 0;
                    }
                    else {
                        this.auxLex += chr;
                        this.writeSalida("Se he encontrado un error lexico en la entrada: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.ERROR, this.auxLex, linea, columna);
                    }
                    break;
                case 1:
                    ; //Estado para reconocer un operador de 'direrente de' !=
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_DIFERENTFROM, this.auxLex, linea, columna);
                    }
                    else {
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_NOT, this.auxLex, linea, columna);
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
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
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
                        this.writeSalida("Se ha encontrado Token Comentario: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.COMENTARIO_SL, this.auxLex, linea, colaux, true);
                        linea++;
                        columna = 0;
                    }
                    break;
                case 4:
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex.toString());
                        this.addToken(Token_1.TipoToken.SYM_MENORIGUAL, this.auxLex, linea, columna);
                    }
                    else {
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_MENORQUE, this.auxLex, linea, columna);
                        i = i - 1;
                    }
                    break;
                case 5:
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_MAYORIGUAL, this.auxLex, linea, columna);
                    }
                    else {
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_MAYORQUE, this.auxLex, linea, columna);
                        i = i - 1;
                    }
                    break;
                case 6:
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_COMPARACION, this.auxLex, linea, columna);
                    }
                    else {
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.SYM_IGUAL, this.auxLex, linea, colaux);
                        colaux = 0;
                        i = i - 1;
                    }
                    break;
                case 7:
                    if (chr != "*") {
                        this.auxLex += chr;
                        this.estado = 7;
                        if (chr == "\n") {
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
                        this.writeSalida("Se ha encontrado Token Comentario multilina: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.COMENTARIO_ML, this.auxLex, linea, colaux);
                    }
                    else {
                        this.auxLex += chr;
                        this.estado = 7;
                        if (chr == "\n") {
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
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.NUMERO, this.auxLex, linea, columna);
                        i = i - 1;
                    }
                    break;
                case 10:
                    if (this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 10;
                    }
                    else {
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.NUMERO, this.auxLex, linea, columna);
                        i = i - 1;
                    }
                    break;
                case 11: //IDENTIFICADORES
                    if (this.isLetter(chr) || chr == "_" || this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 11;
                    }
                    else {
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        if (this.auxLex == "int") {
                            this.addToken(Token_1.TipoToken.KW_INT, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "string") {
                            this.addToken(Token_1.TipoToken.KW_STRING, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "bool") {
                            this.addToken(Token_1.TipoToken.KW_BOOL, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "double") {
                            this.addToken(Token_1.TipoToken.KW_DOUBLE, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "char") {
                            this.addToken(Token_1.TipoToken.KW_CHAR, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "void") {
                            this.addToken(Token_1.TipoToken.KW_VOID, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "main") {
                            this.addToken(Token_1.TipoToken.KW_MAIN, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "if") {
                            this.addToken(Token_1.TipoToken.KW_IF, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "switch") {
                            this.addToken(Token_1.TipoToken.KW_SWITCH, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "for") {
                            this.addToken(Token_1.TipoToken.KW_FOR, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "while") {
                            this.addToken(Token_1.TipoToken.KW_WHILE, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "do") {
                            this.addToken(Token_1.TipoToken.KW_DO, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "true") {
                            this.addToken(Token_1.TipoToken.KW_TRUE, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "false") {
                            this.addToken(Token_1.TipoToken.KW_FALSE, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "Console") {
                            this.addToken(Token_1.TipoToken.KW_CONSOLE, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "Write") {
                            this.addToken(Token_1.TipoToken.KW_WRITE, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "return") {
                            this.addToken(Token_1.TipoToken.KW_RETURN, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "continue") {
                            this.addToken(Token_1.TipoToken.KW_CONTINUE, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "break") {
                            this.addToken(Token_1.TipoToken.KW_BREAK, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "case") {
                            this.addToken(Token_1.TipoToken.KW_CASE, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "else") {
                            this.addToken(Token_1.TipoToken.KW_ELSE, this.auxLex, linea, columna);
                        }
                        else if (this.auxLex == "default") {
                            this.addToken(Token_1.TipoToken.KW_DEFAULT, this.auxLex, linea, columna);
                        }
                        else {
                            this.addToken(Token_1.TipoToken.IDENTIFICADOR, this.auxLex, linea, columna);
                        }
                        i = i - 1;
                    }
                    break;
                case 12:
                    if (chr != "\"") {
                        this.auxLex += chr;
                        this.estado = 12;
                        if (chr == "\n") {
                            linea++;
                            columna = 0;
                        }
                    }
                    else {
                        this.auxLex += chr;
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.addToken(Token_1.TipoToken.CADENA_SIMPLE, this.auxLex, linea, colaux, true);
                    }
                    break;
                case 13:
                    if (this.isLetter(chr) || this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 14;
                    }
                    else {
                        this.auxLex += chr;
                        if (chr == "\n") {
                            linea++;
                            columna = 0;
                        }
                        this.estado = 15;
                    }
                    break;
                /*
                if (chr != "'") {
                    this.auxLex += chr;
                    this.estado = 12;
                    if (chr == "\n" || chr == "\r") {
                        linea++;
                        columna = 0;
                    }
                } else {
                    this.auxLex += chr;
                    this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    this.addToken(TipoToken.CADENA_HTML, this.auxLex, linea, colaux, true);
                }
                break;
                */
                case 14:
                    if (chr == "'") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.CADENA_CHAR, this.auxLex, linea, columna);
                    }
                    else {
                        this.auxLex += chr;
                        if (chr == "\n") {
                            linea++;
                            columna = 0;
                        }
                        this.estado = 15;
                    }
                    break;
                case 15:
                    if (chr != "'") {
                        this.auxLex += chr;
                        if (chr == "\n") {
                            linea++;
                            columna = 0;
                        }
                        this.estado = 15;
                    }
                    else {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.CADENA_HTML, this.auxLex, linea, colaux, true);
                    }
                    break;
                case 16:
                    if (chr == "&") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_AND, this.auxLex, linea, columna);
                    }
                    else {
                        this.addToken(Token_1.TipoToken.ERROR, "&", linea, columna);
                        i = i - 1;
                    }
                    break;
                case 17:
                    if (chr == "|") {
                        this.auxLex += chr;
                        this.addToken(Token_1.TipoToken.SYM_OR, this.auxLex, linea, columna);
                    }
                    else {
                        this.addToken(Token_1.TipoToken.ERROR, "|", linea, columna);
                        i = i - 1;
                    }
                    break;
            }
        }
    };
    AnalizadorLexico.prototype.getListaTokens = function () {
        return this.lista;
    };
    AnalizadorLexico.prototype.isLetter = function (char) {
        var valor = char.charCodeAt(0);
        if ((valor > 64 && valor < 91)) {
            return true;
        }
        else {
            if (valor > 96 && valor < 123) {
                return true;
            }
            else {
                return false;
            }
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
        (_a = this.lista) === null || _a === void 0 ? void 0 : _a.push(new Token_1.Token(tipo, lexema, line, col - 1));
        this.auxLex = "";
        this.estado = 0;
    };
    AnalizadorLexico.prototype.writeSalida = function (mensaje) {
        console.log(mensaje.toString());
        this.salida_consola += "\n" + mensaje;
    };
    AnalizadorLexico.prototype.printLista = function () {
        var size = this.lista.length;
        for (var i = 0; i < size; i++) {
            console.log(this.lista[i].tokenToString());
        }
    };
    return AnalizadorLexico;
}());
module.exports = AnalizadorLexico;
