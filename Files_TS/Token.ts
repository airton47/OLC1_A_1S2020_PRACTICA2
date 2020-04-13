class Token {
    tipo: TipoToken | undefined;
    lexema: string | undefined;
    linea: number | undefined;
    columna: number | undefined;

    constructor(tipo: TipoToken, lexema: string, linea?: number, columna?: number) {
        this.tipo = tipo;
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
    
}
enum TipoToken { IDENTIFICADOR,NUMERO,CADENA_SIMPLE,CADENA_HTML,COMENTARIO_SL,COMENTARIO_ML,
    KW_INT,KW_STRING,KW_DOUBLE,KW_BOOL,KW_CHAR,SYM_IGUAL,SYM_PUNTOYCOMA,
    SYM_COMA,SYM_MAS,SYM_MENOS,SYM_MULTIPLICACION,SYM_DIVISION,SYM_AND,SYM_OR,SYM_NOT,
    SYM_MAYORQUE,SYM_MENORQUE,SYM_MAYORIGUAL,SYM_MENORIGUAL,SYM_COMPARACION,SYM_DIFERENTFROM,
    SYM_PARENTESISIZQ,SYM_PARENTESISDER,SYM_LLAVEIZQ,SYM_LLAVEDER,SYM_PUNTO,
    KW_BREAK,KW_CONTINUE,KW_RETURN,KW_CONSOLE,KW_WRITE,KW_DO,KW_FOR,KW_WHILE,
    KW_IF,KW_SWITCH,WK_CASE,KW_VOID,KW_MAIN,ERROR,KW_TRUE,KW_FALSE};
export { Token, TipoToken };