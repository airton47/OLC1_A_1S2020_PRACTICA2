"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Token = /** @class */ (function () {
    function Token(Tipo, lexema, linea, columna) {
        this.tipo = Tipo;
        this.lexema = lexema;
        if (linea == undefined) {
            this.linea = 0;
        }
        else {
            this.linea = linea;
        }
        if (columna == undefined) {
            this.columna = 0;
        }
        else {
            this.columna = columna;
        }
    }
    Token.prototype.getTipoToken = function () {
        return this.tipo;
    };
    Token.prototype.getTipo = function () {
        var tp = "";
        switch (this.tipo) {
            case TipoToken.CADENA_HTML:
                tp = "CADENA_HTML";
                break;
            case TipoToken.CADENA_SIMPLE:
                tp = "CADENA_SIMPLE";
                break;
            case TipoToken.COMENTARIO_ML:
                tp = "COMENTARIO_ML";
                break;
            case TipoToken.COMENTARIO_SL:
                tp = "COMENTARIO_SL";
                break;
            case TipoToken.ERROR:
                tp = "ERROR";
                break;
            case TipoToken.IDENTIFICADOR:
                tp = "IDENTIFICADOR";
                break;
            case TipoToken.KW_BOOL:
                tp = "KW_BOOL";
                break;
            case TipoToken.KW_BREAK:
                tp = "KW_BREAK";
                break;
            case TipoToken.KW_CASE:
                tp = "KW_CASE";
                break;
            case TipoToken.KW_CHAR:
                tp = "KW_CHAR";
                break;
            case TipoToken.KW_CONSOLE:
                tp = "KW_CONSOLE";
                break;
            case TipoToken.KW_CONTINUE:
                tp = "KW_CONTINUE";
                break;
            case TipoToken.KW_DO:
                tp = "KW_DO";
                break;
            case TipoToken.KW_DOUBLE:
                tp = "KW_DOUBLE";
                break;
            case TipoToken.KW_FALSE:
                tp = "KW_FALSE";
                break;
            case TipoToken.KW_FOR:
                tp = "KW_FOR";
                break;
            case TipoToken.KW_IF:
                tp = "KW_IF";
                break;
            case TipoToken.KW_INT:
                tp = "KW_INT";
                break;
            case TipoToken.KW_MAIN:
                tp = "KW_MAIN";
                break;
            case TipoToken.KW_RETURN:
                tp = "KW_RETURN";
                break;
            case TipoToken.KW_STRING:
                tp = "KW_STRING";
                break;
            case TipoToken.KW_SWITCH:
                tp = "KW_SWITCH";
                break;
            case TipoToken.KW_TRUE:
                tp = "KW_TRUE";
                break;
            case TipoToken.KW_VOID:
                tp = "KW_VOID";
                break;
            case TipoToken.KW_WHILE:
                tp = "KW_WHILE";
                break;
            case TipoToken.KW_WRITE:
                tp = "KW_WRITE";
                break;
            case TipoToken.NUMERO:
                tp = "NUMERO";
                break;
            case TipoToken.SYM_AND:
                tp = "SYM_AND";
                break;
            case TipoToken.SYM_COMA:
                tp = "SYM_COMA";
                break;
            case TipoToken.SYM_COMPARACION:
                tp = "SYM_COMPARACION";
                break;
            case TipoToken.SYM_DIFERENTFROM:
                tp = "SYM_DIFERENTFROM";
                break;
            case TipoToken.SYM_DIVISION:
                tp = "SYM_DIVISION";
                break;
            case TipoToken.SYM_IGUAL:
                tp = "SYM_IGUAL";
                break;
            case TipoToken.SYM_LLAVEDER:
                tp = "SYM_LLAVEDER";
                break;
            case TipoToken.SYM_LLAVEIZQ:
                tp = "SYM_LLAVEIZQ";
                break;
            case TipoToken.SYM_MAS:
                tp = "SYM_MAS";
                break;
            case TipoToken.SYM_MAYORIGUAL:
                tp = "SYM_MAYORIGUAL";
                break;
            case TipoToken.SYM_MAYORQUE:
                tp = "SYM_MAYORQUE";
                break;
            case TipoToken.SYM_MENORIGUAL:
                tp = "SYM_MENORIGUAL";
                break;
            case TipoToken.SYM_MENORQUE:
                tp = "SYM_MENORQUE";
                break;
            case TipoToken.SYM_MENOS:
                tp = "SYM_MENOS";
                break;
            case TipoToken.SYM_MULTIPLICACION:
                tp = "SYM_MULTIPLICACION";
                break;
            case TipoToken.SYM_NOT:
                tp = "SYM_NOT";
                break;
            case TipoToken.SYM_OR:
                tp = "SYM_OR";
                break;
            case TipoToken.SYM_PARENTESISDER:
                tp = "SYM_PARENTESISDER";
                break;
            case TipoToken.SYM_PARENTESISIZQ:
                tp = "SYM_PARENTESISIZQ";
                break;
            case TipoToken.SYM_PUNTO:
                tp = "SYM_PUNTO";
                break;
            case TipoToken.SYM_PUNTOYCOMA:
                tp = "SYM_PUNTOYCOMA";
                break;
            case TipoToken.KW_ELSE:
                tp = "KW_ELSE";
                break;
            case TipoToken.KW_DEFAULT:
                tp = "KW_DEFAULT";
                break;
            case TipoToken.CADENA_CHAR:
                tp = "CADENA_CHAR";
                break;
            case TipoToken.SYM_DOSPUNTOS:
                tp = "SYM_DOSPUNTOS";
                break;
            case TipoToken.ULTIMO:
                tp = "ULTIMO";
                break;
        }
        return tp;
    };
    Token.prototype.tokenToString = function () {
        var cadena = "";
        cadena += "\nTipo:" + this.getTipo() + "| Lexema:" + this.lexema + "|Linea:" + this.linea + "|Columna:" + this.columna;
        return cadena;
    };
    return Token;
}());
exports.Token = Token;
var TipoToken;
(function (TipoToken) {
    TipoToken[TipoToken["IDENTIFICADOR"] = 0] = "IDENTIFICADOR";
    TipoToken[TipoToken["NUMERO"] = 1] = "NUMERO";
    TipoToken[TipoToken["CADENA_SIMPLE"] = 2] = "CADENA_SIMPLE";
    TipoToken[TipoToken["CADENA_HTML"] = 3] = "CADENA_HTML";
    TipoToken[TipoToken["COMENTARIO_SL"] = 4] = "COMENTARIO_SL";
    TipoToken[TipoToken["COMENTARIO_ML"] = 5] = "COMENTARIO_ML";
    TipoToken[TipoToken["KW_INT"] = 6] = "KW_INT";
    TipoToken[TipoToken["KW_STRING"] = 7] = "KW_STRING";
    TipoToken[TipoToken["KW_DOUBLE"] = 8] = "KW_DOUBLE";
    TipoToken[TipoToken["KW_BOOL"] = 9] = "KW_BOOL";
    TipoToken[TipoToken["KW_CHAR"] = 10] = "KW_CHAR";
    TipoToken[TipoToken["SYM_IGUAL"] = 11] = "SYM_IGUAL";
    TipoToken[TipoToken["SYM_PUNTOYCOMA"] = 12] = "SYM_PUNTOYCOMA";
    TipoToken[TipoToken["SYM_DOSPUNTOS"] = 13] = "SYM_DOSPUNTOS";
    TipoToken[TipoToken["SYM_COMA"] = 14] = "SYM_COMA";
    TipoToken[TipoToken["SYM_MAS"] = 15] = "SYM_MAS";
    TipoToken[TipoToken["SYM_MENOS"] = 16] = "SYM_MENOS";
    TipoToken[TipoToken["SYM_MULTIPLICACION"] = 17] = "SYM_MULTIPLICACION";
    TipoToken[TipoToken["SYM_DIVISION"] = 18] = "SYM_DIVISION";
    TipoToken[TipoToken["SYM_AND"] = 19] = "SYM_AND";
    TipoToken[TipoToken["SYM_OR"] = 20] = "SYM_OR";
    TipoToken[TipoToken["SYM_NOT"] = 21] = "SYM_NOT";
    TipoToken[TipoToken["SYM_MAYORQUE"] = 22] = "SYM_MAYORQUE";
    TipoToken[TipoToken["SYM_MENORQUE"] = 23] = "SYM_MENORQUE";
    TipoToken[TipoToken["SYM_MAYORIGUAL"] = 24] = "SYM_MAYORIGUAL";
    TipoToken[TipoToken["SYM_MENORIGUAL"] = 25] = "SYM_MENORIGUAL";
    TipoToken[TipoToken["SYM_COMPARACION"] = 26] = "SYM_COMPARACION";
    TipoToken[TipoToken["SYM_DIFERENTFROM"] = 27] = "SYM_DIFERENTFROM";
    TipoToken[TipoToken["SYM_PARENTESISIZQ"] = 28] = "SYM_PARENTESISIZQ";
    TipoToken[TipoToken["SYM_PARENTESISDER"] = 29] = "SYM_PARENTESISDER";
    TipoToken[TipoToken["SYM_LLAVEIZQ"] = 30] = "SYM_LLAVEIZQ";
    TipoToken[TipoToken["SYM_LLAVEDER"] = 31] = "SYM_LLAVEDER";
    TipoToken[TipoToken["SYM_PUNTO"] = 32] = "SYM_PUNTO";
    TipoToken[TipoToken["KW_BREAK"] = 33] = "KW_BREAK";
    TipoToken[TipoToken["KW_CONTINUE"] = 34] = "KW_CONTINUE";
    TipoToken[TipoToken["KW_RETURN"] = 35] = "KW_RETURN";
    TipoToken[TipoToken["KW_CONSOLE"] = 36] = "KW_CONSOLE";
    TipoToken[TipoToken["KW_WRITE"] = 37] = "KW_WRITE";
    TipoToken[TipoToken["KW_DO"] = 38] = "KW_DO";
    TipoToken[TipoToken["KW_FOR"] = 39] = "KW_FOR";
    TipoToken[TipoToken["KW_WHILE"] = 40] = "KW_WHILE";
    TipoToken[TipoToken["KW_IF"] = 41] = "KW_IF";
    TipoToken[TipoToken["KW_SWITCH"] = 42] = "KW_SWITCH";
    TipoToken[TipoToken["KW_CASE"] = 43] = "KW_CASE";
    TipoToken[TipoToken["KW_VOID"] = 44] = "KW_VOID";
    TipoToken[TipoToken["KW_MAIN"] = 45] = "KW_MAIN";
    TipoToken[TipoToken["ERROR"] = 46] = "ERROR";
    TipoToken[TipoToken["KW_TRUE"] = 47] = "KW_TRUE";
    TipoToken[TipoToken["KW_FALSE"] = 48] = "KW_FALSE";
    TipoToken[TipoToken["KW_ELSE"] = 49] = "KW_ELSE";
    TipoToken[TipoToken["KW_DEFAULT"] = 50] = "KW_DEFAULT";
    TipoToken[TipoToken["ULTIMO"] = 51] = "ULTIMO";
    TipoToken[TipoToken["CADENA_CHAR"] = 52] = "CADENA_CHAR";
})(TipoToken || (TipoToken = {}));
exports.TipoToken = TipoToken;
;
