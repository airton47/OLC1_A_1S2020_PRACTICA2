import { Token, TipoToken } from "./Token";

class AnalizadorLexico {

    entrada: string | undefined;
    auxLex: string = "";
    lista: Array<Token> | undefined;
    estado = 0;
    salida_consola: string = "\n";

    constructor(entrada: string) {
        this.entrada = entrada;
        this.lista = new Array<Token>();
    }

    analizar(texto: string): void {
        texto += "#";
        this.entrada = texto;
        let linea: number = 0;
        let columna: number = 0;
        let colaux: number = 0;
        let size: number = this.entrada.length;
        this.estado = 0;

        for (let i: number = 0; i < size; i++) {

            let chr: string = this.entrada.charAt(i);//Caracter actual obtenido por indice
            columna++;//numero de columna actual

            switch (this.estado) {
                case 0:
                    if (chr == "(") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_PARENTESISIZQ, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    } else if (chr == ")") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_PARENTESISDER, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    } else if (chr == "{") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_LLAVEIZQ, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    } else if (chr == "}") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_LLAVEDER, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    }else if (chr == ".") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_PUNTO, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    } else if (chr == ",") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_COMA, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    } else if (chr == ";") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_PUNTOYCOMA, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    } else if (chr == "+") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_MAS, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    } else if (chr == "-") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_MENOS, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    } else if (chr == "*") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_MULTIPLICACION, this.auxLex, linea, columna)
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        this.estado = 0;
                    } else if (chr == "!") {
                        this.auxLex += chr;
                        this.estado = 1;
                    } else if (chr == "/") {
                        this.auxLex += chr;
                        this.estado = 2;
                    } else if (chr == "<") {
                        this.auxLex += chr;
                        this.estado = 4;
                    } else if (chr == ">") {
                        this.auxLex += chr;
                        this.estado = 5;
                    } else if (chr == "=") {
                        this.auxLex += chr;
                        this.estado = 6;
                    } else if (this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 9;
                    } else if (this.isLetter(chr)) {
                        this.auxLex += chr;
                        this.estado = 11;
                    } else if (chr == "\"") {
                        this.auxLex += chr;
                        this.estado = 12;
                    } else if (chr == "'") {
                        this.auxLex += chr;
                        this.estado = 13;
                    } else if (chr == "#" && i == size - 1) {
                        this.writeSalida("*********El analisis lexico de la entrada ha finalizado*********");
                    } else if (chr == "\n" || chr == "\t" || chr == "\r" || chr == " ") {
                        if (chr == "\t" || chr == "\r") {
                            linea++;
                            columna = 0;
                        }
                        this.estado = 0;
                    } else {
                        this.auxLex += chr;
                        this.addToken(TipoToken.ERROR, this.auxLex, linea, columna);
                        this.writeSalida("Se he encontrado une error lexico en la entrada" + this.auxLex);
                    }

                    break;
                case 1: ;//Estado para reconocer un operador de 'direrente de' !=
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_DIFERENTFROM, this.auxLex, linea, columna);
                    } else {
                        this.addToken(TipoToken.ERROR, this.auxLex, linea, columna);
                        i = i - 1;
                    }
                    break;
                case 2:
                    if (chr == "/") {
                        this.auxLex += chr;
                        this.estado = 3;
                        colaux = columna;
                    } else if (chr == "*") {
                        this.auxLex += chr;
                        this.estado = 7;
                    } else {
                        this.addToken(TipoToken.SYM_DIVISION, this.auxLex, linea, columna);
                        i = i - 1;
                    }
                    break;
                case 3:
                    if (chr != "\n") {
                        this.auxLex += chr;
                        this.estado = 3;
                    } else {
                        this.addToken(TipoToken.COMENTARIO_SL, this.auxLex, linea, colaux, true);
                        this.writeSalida("Se ha encontrado Token Comentario: " + this.auxLex);
                        linea++;
                        columna = 0;
                    }
                    break;
                case 4:
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_MENORIGUAL, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    } else {
                        this.addToken(TipoToken.SYM_MENORQUE, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        i = i - 1;
                    }
                    break;
                case 5:
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_MENORIGUAL, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    } else {
                        this.addToken(TipoToken.SYM_MAYORQUE, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        i = i - 1;
                    }
                    break;
                case 6:
                    if (chr == "=") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.SYM_COMPARACION, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    } else {
                        this.addToken(TipoToken.SYM_IGUAL, this.auxLex, linea, columna);
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
                    } else {
                        this.auxLex += chr;
                        this.estado = 8;
                    }
                    break;
                case 8:
                    if (chr == "/") {
                        this.auxLex += chr;
                        this.addToken(TipoToken.COMENTARIO_ML, this.auxLex, linea, colaux);
                        this.writeSalida("Se ha encontrado Token Comentario multilina: " + this.auxLex);
                    } else {
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
                    } else if (chr == ".") {
                        this.auxLex += chr;
                        this.estado = 10;
                    } else {
                        this.addToken(TipoToken.NUMERO, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        i = i - 1;
                    }
                    break;
                case 10:
                    if (this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 10;
                    } else {
                        this.addToken(TipoToken.NUMERO, this.auxLex, linea, columna);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                        i = i - 1;
                    }
                    break;
                case 11://IDENTIFICADORES
                    if (this.isLetter(chr) || chr == "_" || this.isDigit(chr)) {
                        this.auxLex += chr;
                        this.estado = 11;
                    } else {
                        if (this.auxLex == "int") {
                            this.addToken(TipoToken.KW_INT, this.auxLex, linea, columna);
                        } else if (this.auxLex == "string") {
                            this.addToken(TipoToken.KW_STRING, this.auxLex, linea, columna);
                        } else if (this.auxLex == "bool") {
                            this.addToken(TipoToken.KW_BOOL, this.auxLex, linea, columna);
                        } else if (this.auxLex == "double") {
                            this.addToken(TipoToken.KW_DOUBLE, this.auxLex, linea, columna);
                        } else if (this.auxLex == "char") {
                            this.addToken(TipoToken.KW_CHAR, this.auxLex, linea, columna);
                        } else if (this.auxLex == "void") {
                            this.addToken(TipoToken.KW_VOID, this.auxLex, linea, columna);
                        } else if (this.auxLex == "main") {
                            this.addToken(TipoToken.KW_MAIN, this.auxLex, linea, columna);
                        } else if (this.auxLex == "if") {
                            this.addToken(TipoToken.KW_IF, this.auxLex, linea, columna);
                        }else if(this.auxLex=="switch"){
                            this.addToken(TipoToken.KW_SWITCH, this.auxLex, linea, columna);
                        }else if(this.auxLex=="for"){
                            this.addToken(TipoToken.KW_FOR, this.auxLex, linea, columna);
                        }else if(this.auxLex=="while"){
                            this.addToken(TipoToken.KW_WHILE, this.auxLex, linea, columna);
                        }else if(this.auxLex=="do"){
                            this.addToken(TipoToken.KW_DO, this.auxLex, linea, columna);
                        }else if(this.auxLex=="true"){
                            this.addToken(TipoToken.KW_TRUE, this.auxLex, linea, columna);
                        }else if(this.auxLex=="false"){
                            this.addToken(TipoToken.KW_FALSE, this.auxLex, linea, columna);
                        }else if(this.auxLex=="Console"){
                            this.addToken(TipoToken.KW_CONSOLE, this.auxLex, linea, columna);
                        }else if(this.auxLex=="Write"){
                            this.addToken(TipoToken.KW_WRITE, this.auxLex, linea, columna);
                        }else if(this.auxLex=="return"){
                            this.addToken(TipoToken.KW_RETURN, this.auxLex, linea, columna);
                        }else if(this.auxLex=="continue"){
                            this.addToken(TipoToken.KW_CONTINUE, this.auxLex, linea, columna);
                        }else if(this.auxLex=="break"){
                            this.addToken(TipoToken.KW_BREAK, this.auxLex, linea, columna);
                        }else{
                            this.addToken(TipoToken.IDENTIFICADOR, this.auxLex, linea, columna);                            
                        }
                        this.writeSalida("Se ha encontrado Token: "+this.auxLex);
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
                    } else {
                        this.auxLex += chr;
                        this.addToken(TipoToken.CADENA_SIMPLE, this.auxLex, linea, colaux, true);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    }
                    break;
                case 13:
                    if (chr != "'") {
                        this.auxLex += chr;
                        this.estado = 12;
                        if (chr == "\n" || chr == "\r") {
                            linea++;
                            columna = 0;
                        }
                    } else {
                        this.auxLex += chr;
                        this.addToken(TipoToken.CADENA_HTML, this.auxLex, linea, colaux, true);
                        this.writeSalida("Se ha encontrado Token: " + this.auxLex);
                    }
                    break;
                case 14:
                    break;

            }

        }
    }

    public isLetter(char: string): boolean {
        let valor: number = char.charCodeAt(0);
        if (valor > 64 && valor < 91) {
            return true;
        } else {
            return false;
        }
    }

    public isDigit(char: string): boolean {
        if (char == "1" || char == "2" || char == "3" || char == "4" || char == "5" || char == "6" || char == "7" || char == "8" || char == "9" || char == "0") {
            return true;
        } else {
            return false;
        }

    }

    public addToken(tipo: TipoToken, lexema: string, line: number, col: number, flag?: boolean): void {

        if (flag == undefined) {
            col = col - lexema.length;
        }
        this.lista?.push(new Token(tipo, lexema, line, col));
        this.auxLex = "";
        this.estado = 0;
    }

    public writeSalida(mensaje: string): void {
        console.log(mensaje);
        this.salida_consola += "\n" + mensaje;
    }
}

export = AnalizadorLexico;