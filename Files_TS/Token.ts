class Token {
    tipo: TipoToken;
    lexema: string;
    linea: number;
    columna: number;

    public getTipoToken(): TipoToken {
        return this.tipo;
    }

    constructor(Tipo: TipoToken, lexema: string, linea?: number, columna?: number) {
        this.tipo = Tipo;
        this.lexema = lexema;
        if (linea == undefined) {
            this.linea = 0;
        } else {
            this.linea = linea;
        }
        if (columna == undefined) {
            this.columna = 0;
        } else {
            this.columna = columna;
        }
    }

    public getTipo(): string {
        let tp = "";
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
    }

    public tokenToString(): string {
        let cadena: string = "";
        cadena += "\nTipo:" + this.getTipo() + "| Lexema:" + this.lexema + "|Linea:" + this.linea + "|Columna:" + this.columna;
        return cadena;
    }

}
enum TipoToken {
    IDENTIFICADOR, NUMERO, CADENA_SIMPLE, CADENA_HTML, COMENTARIO_SL, COMENTARIO_ML,
    KW_INT, KW_STRING, KW_DOUBLE, KW_BOOL, KW_CHAR, SYM_IGUAL, SYM_PUNTOYCOMA, SYM_DOSPUNTOS,
    SYM_COMA, SYM_MAS, SYM_MENOS, SYM_MULTIPLICACION, SYM_DIVISION, SYM_AND, SYM_OR, SYM_NOT,
    SYM_MAYORQUE, SYM_MENORQUE, SYM_MAYORIGUAL, SYM_MENORIGUAL, SYM_COMPARACION, SYM_DIFERENTFROM,
    SYM_PARENTESISIZQ, SYM_PARENTESISDER, SYM_LLAVEIZQ, SYM_LLAVEDER, SYM_PUNTO,
    KW_BREAK, KW_CONTINUE, KW_RETURN, KW_CONSOLE, KW_WRITE, KW_DO, KW_FOR, KW_WHILE,
    KW_IF, KW_SWITCH, KW_CASE, KW_VOID, KW_MAIN, ERROR, KW_TRUE, KW_FALSE, KW_ELSE, KW_DEFAULT,
    ULTIMO, CADENA_CHAR
};
export { Token, TipoToken };