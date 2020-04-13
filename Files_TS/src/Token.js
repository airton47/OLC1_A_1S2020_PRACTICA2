"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Token = /** @class */ (function () {
    function Token(tipo, lexema, linea, columna) {
        this.tipo = tipo;
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
    TipoToken[TipoToken["SYM_COMA"] = 13] = "SYM_COMA";
    TipoToken[TipoToken["SYM_MAS"] = 14] = "SYM_MAS";
    TipoToken[TipoToken["SYM_MENOS"] = 15] = "SYM_MENOS";
    TipoToken[TipoToken["SYM_MULTIPLICACION"] = 16] = "SYM_MULTIPLICACION";
    TipoToken[TipoToken["SYM_DIVISION"] = 17] = "SYM_DIVISION";
    TipoToken[TipoToken["SYM_AND"] = 18] = "SYM_AND";
    TipoToken[TipoToken["SYM_OR"] = 19] = "SYM_OR";
    TipoToken[TipoToken["SYM_NOT"] = 20] = "SYM_NOT";
    TipoToken[TipoToken["SYM_MAYORQUE"] = 21] = "SYM_MAYORQUE";
    TipoToken[TipoToken["SYM_MENORQUE"] = 22] = "SYM_MENORQUE";
    TipoToken[TipoToken["SYM_MAYORIGUAL"] = 23] = "SYM_MAYORIGUAL";
    TipoToken[TipoToken["SYM_MENORIGUAL"] = 24] = "SYM_MENORIGUAL";
    TipoToken[TipoToken["SYM_COMPARACION"] = 25] = "SYM_COMPARACION";
    TipoToken[TipoToken["SYM_DIFERENTFROM"] = 26] = "SYM_DIFERENTFROM";
    TipoToken[TipoToken["SYM_PARENTESISIZQ"] = 27] = "SYM_PARENTESISIZQ";
    TipoToken[TipoToken["SYM_PARENTESISDER"] = 28] = "SYM_PARENTESISDER";
    TipoToken[TipoToken["SYM_LLAVEIZQ"] = 29] = "SYM_LLAVEIZQ";
    TipoToken[TipoToken["SYM_LLAVEDER"] = 30] = "SYM_LLAVEDER";
    TipoToken[TipoToken["SYM_PUNTO"] = 31] = "SYM_PUNTO";
    TipoToken[TipoToken["KW_BREAK"] = 32] = "KW_BREAK";
    TipoToken[TipoToken["KW_CONTINUE"] = 33] = "KW_CONTINUE";
    TipoToken[TipoToken["KW_RETURN"] = 34] = "KW_RETURN";
    TipoToken[TipoToken["KW_CONSOLE"] = 35] = "KW_CONSOLE";
    TipoToken[TipoToken["KW_WRITE"] = 36] = "KW_WRITE";
    TipoToken[TipoToken["KW_DO"] = 37] = "KW_DO";
    TipoToken[TipoToken["KW_FOR"] = 38] = "KW_FOR";
    TipoToken[TipoToken["KW_WHILE"] = 39] = "KW_WHILE";
    TipoToken[TipoToken["KW_IF"] = 40] = "KW_IF";
    TipoToken[TipoToken["KW_SWITCH"] = 41] = "KW_SWITCH";
    TipoToken[TipoToken["WK_CASE"] = 42] = "WK_CASE";
    TipoToken[TipoToken["KW_VOID"] = 43] = "KW_VOID";
    TipoToken[TipoToken["KW_MAIN"] = 44] = "KW_MAIN";
    TipoToken[TipoToken["ERROR"] = 45] = "ERROR";
    TipoToken[TipoToken["KW_TRUE"] = 46] = "KW_TRUE";
    TipoToken[TipoToken["KW_FALSE"] = 47] = "KW_FALSE";
})(TipoToken || (TipoToken = {}));
exports.TipoToken = TipoToken;
;
