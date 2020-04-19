"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Token_1 = require("./Token");
var Sentencia_1 = __importDefault(require("./Sentencia"));
var Declaracion_1 = __importDefault(require("./Declaracion"));
var Comentario_1 = __importDefault(require("./Comentario"));
var Asignacion_1 = __importDefault(require("./Asignacion"));
var Return_1 = __importDefault(require("./Return"));
var Metodo_1 = __importDefault(require("./Metodo"));
var Funcion_1 = __importDefault(require("./Funcion"));
var MetodoMain_1 = __importDefault(require("./MetodoMain"));
var SetenciaFor_1 = __importDefault(require("./SetenciaFor"));
var SentenciaWhile_1 = __importDefault(require("./SentenciaWhile"));
var SentenciaDoWhile_1 = __importDefault(require("./SentenciaDoWhile"));
var SentenciaIF_1 = __importDefault(require("./SentenciaIF"));
var AnalizadorSintactico = /** @class */ (function () {
    function AnalizadorSintactico() {
        this.listaSentencias = new Array();
        this.numPreAnalisis = 0;
        this.flag_error = false;
        //this.preAnalisis = new Token(TipoToken.ULTIMO, "");
        //this.listaTokens = new Array<Token>();
    }
    AnalizadorSintactico.prototype.parsear = function (tokens) {
        console.log("Empieza el analisis sintactico!");
        this.listaTokens = tokens;
        //this.listaTokens.reverse;
        var index = 0;
        this.preAnalisis = this.listaTokens[index];
        this.numPreAnalisis = 0;
        //this.printLista();
        console.log(this.listaTokens.length);
        this.START();
    };
    /*
    START   - LI ULTIMO
    LI  - LIP
        - epsilon

    LIP - S LIP

    S   - CM
        |DFN
        |A
        |M
        |MN
        |SC
        |SR
        |SL

    CM  - COM_ML
        | COM_SL

    DFN - T ID DFNP

    DFNP  - DEF
        | FN

    DEF - LV AS ;

    FN  - ( P ) { I }

    T   - INT
        |STRING
        |DOUBLE
        |CHAR
        |BOOL

    LV  - , ID LV
    EX  - ID ( LP )
        | VN
        | E
    
    */
    //Para cada no terminal del lado izquierdo de las producciones, se crea un método
    //Para cada no terminal del lado derecho de las producciones, se hace una llamada 
    //al método que le corresponde, y para cada terminal del lado derecho se hace una 
    //llamada al método match enviando como parámetro el terminal.
    AnalizadorSintactico.prototype.START = function () {
        this.joinListas(this.listaSentencias, this.LI());
        if (this.preAnalisis.tipo == Token_1.TipoToken.ULTIMO) {
            this.match(Token_1.TipoToken.ULTIMO);
            return;
        }
        //console.log(this.listaSentencias);
    };
    AnalizadorSintactico.prototype.LI = function () {
        var sentencia;
        var lista = new Array();
        console.log("Entro a estado: LI()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.ULTIMO) {
            //this.match(TipoToken.ULTIMO);
            return lista;
        }
        lista = this.LIP();
        return lista;
        /*
        let sentencia: Sentencia | undefined;
        let lista: Array<Sentencia> = new Array<Sentencia>();
        console.log("Entro a estado: LI()");
        if (this.preAnalisis.tipo == TipoToken.ULTIMO) {
            //this.match(TipoToken.ULTIMO);
            return lista;
        }
        sentencia = this.S();
        if (sentencia != undefined || sentencia != null) {
            lista.push(sentencia);
        }
        this.joinListas(lista, this.LIP());
        return lista;
        */
    };
    AnalizadorSintactico.prototype.LIP = function () {
        var lista = new Array();
        var sentencia;
        console.log("Entro a estado: LIP()");
        sentencia = this.S();
        if (sentencia != null || sentencia != undefined) {
            lista.push(sentencia);
        }
        if (this.preAnalisis.tipo == Token_1.TipoToken.ULTIMO) {
            return lista;
        }
        else {
            var lista_aux = this.joinListas(lista, this.LIP());
            return lista_aux;
        }
        /*
        let lista: Array<Sentencia> = new Array<Sentencia>();
        let sentencia: Sentencia | undefined;
        console.log("Entro a estado: LIP()");
        if (this.preAnalisis.tipo == TipoToken.ULTIMO) {
            return lista;
        }
        sentencia = this.S();
        if (sentencia != null || sentencia != undefined) {
            lista.push(sentencia);
        }
        let lista_aux: Array<Sentencia> = this.joinListas(lista, this.LIP());
        return lista_aux;
        */
    };
    AnalizadorSintactico.prototype.S = function () {
        var sentencia;
        console.log("Entro a estado: S()");
        //this.CM();
        sentencia = this.CM(); //COMENTARIOS MULTI-LINE O SINBLE-LINE
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.FN();
        //sentencia = this.FN();
        //if (sentencia != undefined || sentencia != null) {
        //
        //}
        sentencia = this.DFN(); //Para declaraciones de variables o funciones con tipo de retorno
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.A();
        sentencia = this.A(); //PARA ASIGNACION A VARIABLES
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.M();
        sentencia = this.M(); //PARA METODOS VOID
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.SC();
        sentencia = this.SC();
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.SR();
        sentencia = this.SR();
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.SL();
        sentencia = this.SL();
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.CM = function () {
        var sentencia = undefined;
        var cad = "";
        console.log("Entro a estado: CM()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.COMENTARIO_ML) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.COMENTARIO_ML);
            sentencia = new Comentario_1.default(cad);
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.COMENTARIO_SL) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.COMENTARIO_SL);
            sentencia = new Comentario_1.default(cad);
        }
        return sentencia;
    };
    AnalizadorSintactico.prototype.DFN = function () {
        console.log("Entro a estado: DFN()");
        var sentencia;
        var flag = this.T();
        if (flag == false) {
            return undefined;
        }
        if (this.preAnalisis.tipo == Token_1.TipoToken.IDENTIFICADOR) {
            var id = this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            sentencia = this.DFNP(id);
            return sentencia;
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.DFNP = function (id) {
        console.log("Entro a estado: DFNP()");
        var sentencia;
        sentencia = this.DEF(id);
        if (sentencia != undefined) {
            return sentencia;
        }
        sentencia = this.FN(id);
        if (sentencia != undefined) {
            return sentencia;
        }
        return undefined;
        /*
        console.log("Entro a estado: D()");
        let sentencia: Sentencia;
        let flag: boolean = this.T();
        if (flag == false) {
            return undefined;
        }
        let variables: string = this.LV();
        let expresion: string = this.AS();
        if (this.preAnalisis.tipo == TipoToken.SYM_PUNTOYCOMA) {
            this.match(TipoToken.SYM_PUNTOYCOMA);
        }
        if (this.isValid(variables) && this.flag_error == false) {
            if (this.isValid(expresion)) {
                sentencia = new Declaracion(variables, expresion);
                return sentencia;
            } else {
                sentencia = new Declaracion(variables);
                return sentencia;
            }
        } else {
            return undefined;
        }
        */
    };
    AnalizadorSintactico.prototype.DEF = function (id) {
        console.log("Entro a estado: DEF()");
        var sentencia;
        var cad = "";
        cad += this.LV();
        cad += this.AS();
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_PUNTOYCOMA) {
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false && this.flag_error == false) {
                sentencia = new Declaracion_1.default(id, cad);
                return sentencia;
            }
            else {
                this.flag_error = false;
            }
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.D = function () {
        console.log("Entro a estado: D()");
        var sentencia;
        var flag = this.T();
        if (flag == false) {
            return undefined;
        }
        var variables = this.LV();
        var expresion = this.AS();
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_PUNTOYCOMA) {
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
        }
        if (this.isValid(variables) && this.flag_error == false) {
            if (this.isValid(expresion)) {
                sentencia = new Declaracion_1.default(variables, expresion);
                return sentencia;
            }
            else {
                sentencia = new Declaracion_1.default(variables);
                return sentencia;
            }
        }
        else {
            return undefined;
        }
    };
    AnalizadorSintactico.prototype.T = function () {
        var flag = false;
        console.log("Entro a estado: T()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_INT) {
            this.match(Token_1.TipoToken.KW_INT);
            flag = true;
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_STRING) {
            this.match(Token_1.TipoToken.KW_STRING);
            flag = true;
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_DOUBLE) {
            this.match(Token_1.TipoToken.KW_DOUBLE);
            flag = true;
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_BOOL) {
            this.match(Token_1.TipoToken.KW_BOOL);
            flag = true;
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_CHAR) {
            this.match(Token_1.TipoToken.KW_CHAR);
            flag = true;
        }
        return flag;
    };
    AnalizadorSintactico.prototype.LV = function () {
        var listvars = "";
        console.log("Entro a estado: LV()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_COMA) {
            listvars += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_COMA);
            listvars += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            listvars += this.LV();
            return listvars;
        }
        else {
            return listvars;
        }
        /*
        let listvars: string = "";
        console.log("Entro a estado: LV()");
        if (this.preAnalisis.tipo == TipoToken.IDENTIFICADOR) {
            listvars += this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            listvars += this.LVP()
            return listvars;
        } else {
            return listvars;
        }
        */
    };
    AnalizadorSintactico.prototype.LVP = function () {
        var vars = "";
        console.log("Entro a estado: LVP()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_COMA) {
            vars += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_COMA);
            vars += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            vars += this.LVP();
        }
        return vars;
    };
    AnalizadorSintactico.prototype.AS = function () {
        var cad = "";
        console.log("Entro a estado: AS()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_IGUAL) {
            this.match(Token_1.TipoToken.SYM_IGUAL);
            cad += this.EX();
        }
        return cad;
    };
    AnalizadorSintactico.prototype.EX = function () {
        var cad = "";
        console.log("Entro a estado: EX()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.IDENTIFICADOR) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            cad += this.LP();
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
        }
        cad += this.VN();
        cad += this.E();
        return cad;
    };
    AnalizadorSintactico.prototype.LP = function () {
        var cad = "";
        console.log("Entro a estado: LP()");
        cad += this.VN();
        cad += this.LPP();
        return cad;
    };
    AnalizadorSintactico.prototype.LPP = function () {
        var cad = "";
        console.log("Entro a estado: LPP()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_COMA) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_COMA);
            cad += this.VN();
            cad += this.LPP();
        }
        return cad;
    };
    AnalizadorSintactico.prototype.VN = function () {
        var cad = "";
        console.log("Entro a estado: VN()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.CADENA_CHAR) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.CADENA_CHAR);
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.CADENA_SIMPLE) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.CADENA_SIMPLE);
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.CADENA_HTML) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.CADENA_HTML);
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.NUMERO) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.NUMERO);
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_TRUE) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.KW_TRUE);
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_FALSE) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.KW_FALSE);
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.IDENTIFICADOR) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
        }
        return cad;
    };
    AnalizadorSintactico.prototype.E = function () {
        var cad = "";
        console.log("Entro a estado: E()");
        cad += this.TT();
        cad += this.EP();
        return cad;
    };
    AnalizadorSintactico.prototype.EP = function () {
        var cad = "";
        console.log("Entro a estado: EP()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_MAS) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_MAS);
            cad += this.TT();
            cad += this.EP();
            return cad;
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_MENOS) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_MENOS);
            cad += this.TT();
            cad += this.EP();
            return cad;
        }
        return cad;
    };
    AnalizadorSintactico.prototype.TT = function () {
        var cad = "";
        console.log("Entro a estado: TT()");
        cad += this.F();
        cad += this.TTP();
        return cad;
    };
    AnalizadorSintactico.prototype.TTP = function () {
        var cad = "";
        console.log("Entro a estado: TPP()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_MULTIPLICACION) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_MULTIPLICACION);
            cad += this.F();
            cad += this.TTP();
            return cad;
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_DIVISION) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_DIVISION);
            cad += this.F();
            cad += this.TTP();
            return cad;
        }
        return cad;
    };
    AnalizadorSintactico.prototype.F = function () {
        var cad = "";
        console.log("Entro a estado: F()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.NUMERO) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.NUMERO);
            return cad;
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.IDENTIFICADOR) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            return cad;
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_PARENTESISIZQ) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            cad += this.E();
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            return cad;
        }
        return "";
    };
    AnalizadorSintactico.prototype.A = function () {
        var asignacion;
        console.log("Entro a estado: A()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.IDENTIFICADOR) {
            var cad1 = this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            this.match(Token_1.TipoToken.SYM_IGUAL);
            var cad = "";
            cad += this.EX();
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
            if (this.isValid(cad) == true && this.flag_error == false) {
                asignacion = new Asignacion_1.default(cad1, cad);
                asignacion.printSentencia();
                return asignacion;
            }
            this.flag_error = false;
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.M = function () {
        var sentencia;
        console.log("Entro a estado: M()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_VOID) {
            this.match(Token_1.TipoToken.KW_VOID);
            var id = this.preAnalisis.lexema;
            var tipo = this.getTipo(this.preAnalisis);
            if (tipo == Token_1.TipoToken.KW_MAIN) {
                sentencia = this.MN();
                if (sentencia != undefined && this.flag_error == false) {
                    return sentencia;
                }
            }
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            var parametros = "";
            parametros += this.P();
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_LLAVEIZQ);
            var list = this.I();
            this.match(Token_1.TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                sentencia = new Metodo_1.default(id, parametros, list);
                return sentencia;
            }
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.P = function () {
        var cad = "";
        console.log("Entro a estado: P()");
        cad += this.LLP();
        return cad;
    };
    AnalizadorSintactico.prototype.LLP = function () {
        var cad = "";
        console.log("Entro a estado: LLP()");
        this.T();
        if (this.preAnalisis.tipo == Token_1.TipoToken.IDENTIFICADOR) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            cad += this.LLPP();
        }
        return cad;
    };
    AnalizadorSintactico.prototype.LLPP = function () {
        var cad = "";
        console.log("Entro a estado: LLPP()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_COMA) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_COMA);
            this.T();
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            cad += this.LLPP();
        }
        return cad;
    };
    AnalizadorSintactico.prototype.I = function () {
        var list;
        console.log("Entro a estado: I()");
        list = this.LIV2();
        if (this.flag_error == false && list != undefined) {
            return list;
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.LIV2 = function () {
        var sentencia;
        var lista = new Array();
        console.log("Entro a estado: LIV2()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_LLAVEDER) {
            return lista;
        }
        sentencia = this.SV2();
        if (sentencia != undefined || sentencia != null) {
            lista.push(sentencia);
        }
        this.joinListas(lista, this.LIPV2());
        return lista;
    };
    AnalizadorSintactico.prototype.LIPV2 = function () {
        var lista = new Array();
        var sentencia;
        console.log("Entro a estado: LIPV2()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_LLAVEDER) {
            return lista;
        }
        sentencia = this.SV2();
        if (sentencia != null || sentencia != undefined) {
            lista.push(sentencia);
        }
        return this.joinListas(lista, this.LIPV2());
    };
    AnalizadorSintactico.prototype.SV2 = function () {
        var sentencia;
        console.log("Entro a estado: SV2()");
        sentencia = this.CM(); //COMENTARIOS MULTI-LINE O SINBLE-LINE
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        sentencia = this.D(); //Para declaraciones de variables
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        sentencia = this.A(); //PARA ASIGNACION A VARIABLES
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.SC();
        //this.SR();
        sentencia = this.SL();
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.FN = function (id) {
        var sentencia;
        console.log("Entro a estado: FN()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_PARENTESISIZQ) {
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            var parametros = "";
            parametros += this.P();
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_LLAVEIZQ);
            var lista = this.I();
            this.match(Token_1.TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                sentencia = new Funcion_1.default(id, parametros, lista);
                return sentencia;
            }
        }
        return undefined;
        /*
        let sentencia: Sentencia;
        console.log("Entro a estado: FN()");
        this.T();
        if (this.preAnalisis.tipo == TipoToken.IDENTIFICADOR) {
            let id: string = this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            let parametros: string = "";
            parametros += this.P();
            this.match(TipoToken.SYM_LLAVEDER);
            this.match(TipoToken.SYM_LLAVEIZQ);
            let lista: Array<Sentencia> | undefined = this.I();
            this.match(TipoToken.SYM_LLAVEDER)
            if (this.flag_error == false && lista != undefined) {
                sentencia = new Funcion(id, parametros, lista);
                return sentencia;
            } else {
                this.flag_error = false;
            }
        }
        return undefined;
        */
    };
    AnalizadorSintactico.prototype.MN = function () {
        console.log("Entro a estado: MN()");
        var sentencia;
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_MAIN) {
            this.match(Token_1.TipoToken.KW_MAIN);
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_LLAVEIZQ);
            var lista = this.I();
            this.match(Token_1.TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                sentencia = new MetodoMain_1.default(lista);
                return sentencia;
            }
            else {
                this.flag_error = false;
            }
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.SC = function () {
        console.log("Entro a estado: SC()");
        var sentencia;
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_IF) {
            sentencia = this.IF();
        }
        if (sentencia != undefined) {
            return sentencia;
        }
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_SWITCH) {
            this.match(Token_1.TipoToken.KW_SWITCH);
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_LLAVEIZQ);
            this.SW();
            this.DF();
            this.match(Token_1.TipoToken.SYM_LLAVEDER);
        }
        return undefined;
        /*
        console.log("Entro a estado: SC()");
        this.IF();
        if (this.preAnalisis.tipo == TipoToken.KW_SWITCH) {
            this.match(TipoToken.KW_SWITCH);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            this.match(TipoToken.IDENTIFICADOR);
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_LLAVEIZQ);
            this.SW();
            this.DF();
            this.match(TipoToken.SYM_LLAVEDER);
        }
        */
    };
    AnalizadorSintactico.prototype.IF = function () {
        console.log("Entro a estado: IF()");
        var sentencia;
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_IF) {
            this.match(Token_1.TipoToken.KW_IF);
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            var condicion = this.C();
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_LLAVEIZQ);
            var lista = this.I();
            this.match(Token_1.TipoToken.SYM_LLAVEDER);
            var listaanidados = this.ANI();
            if (this.flag_error == false) {
                sentencia = new SentenciaIF_1.default(condicion, lista, listaanidados);
                return sentencia;
            }
            else {
                this.flag_error = false;
            }
        }
        return undefined;
        /*
        console.log("Entro a estado: IF()");
        if (this.preAnalisis.tipo == TipoToken.KW_IF) {
            this.match(TipoToken.KW_IF);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            this.I();
            this.EE();
            this.match(TipoToken.SYM_PARENTESISDER);
        }
        */
    };
    AnalizadorSintactico.prototype.ANI = function () {
        console.log('Entro a estado: ANI()');
        var lista;
        return lista = this.LANI();
    };
    AnalizadorSintactico.prototype.LANI = function () {
        console.log('Entro a estado : LANI()');
        var listaifs = new Array();
        var elifsentencia = this.ELIF();
        if (elifsentencia != undefined) {
            listaifs.push(elifsentencia);
        }
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_ELSE) {
            var aux = this.joinListasIF(listaifs, this.LANI());
            return aux;
        }
        else {
            return listaifs;
        }
        //return undefined;
    };
    AnalizadorSintactico.prototype.ELIF = function () {
        console.log('Entro a estado: ELIF()');
        var senif;
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_ELSE) {
            this.match(Token_1.TipoToken.KW_ELSE);
            this.match(Token_1.TipoToken.KW_IF);
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            var condicion = this.C();
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_LLAVEIZQ);
            var sentencias = this.I();
            this.match(Token_1.TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                senif = new SentenciaIF_1.default(condicion, sentencias);
                console.log(senif.printSentencia());
                return senif;
            }
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.C = function () {
        var condicion = "";
        console.log("Entro a estado: C()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_NOT) {
            this.match(Token_1.TipoToken.SYM_NOT);
            condicion += "not ";
            condicion += this.VN();
            condicion += this.OP();
            condicion += this.VN();
        }
        condicion += this.VN();
        condicion += this.OP();
        condicion += this.VN();
        return condicion;
    };
    AnalizadorSintactico.prototype.OP = function () {
        var operacion = "";
        console.log("Entro a estado: OP()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_MAYORQUE) {
            this.match(Token_1.TipoToken.SYM_MAYORQUE);
            operacion = ">";
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_MAYORIGUAL) {
            this.match(Token_1.TipoToken.SYM_MAYORIGUAL);
            operacion = ">=";
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_MENORQUE) {
            this.match(Token_1.TipoToken.SYM_MENORQUE);
            operacion = "<";
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_MENORIGUAL) {
            this.match(Token_1.TipoToken.SYM_MENORIGUAL);
            operacion = "<=";
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_COMPARACION) {
            this.match(Token_1.TipoToken.SYM_COMPARACION);
            operacion = "==";
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_DIFERENTFROM) {
            this.match(Token_1.TipoToken.SYM_DIFERENTFROM);
            operacion = "!=";
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_AND) {
            this.match(Token_1.TipoToken.SYM_AND);
            operacion = "and";
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_OR) {
            this.match(Token_1.TipoToken.SYM_OR);
            operacion = "or";
        }
        return operacion;
    };
    AnalizadorSintactico.prototype.SW = function () {
        console.log("Entro a estado: SW()");
        this.CS();
        this.SWP();
    };
    AnalizadorSintactico.prototype.SWP = function () {
        console.log("Entro a estado: SWP()");
        this.CS();
        this.SWP();
    };
    AnalizadorSintactico.prototype.CS = function () {
        console.log("Entro a estado: CS()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_CASE) {
            this.match(Token_1.TipoToken.KW_CASE);
            this.match(Token_1.TipoToken.SYM_DOSPUNTOS);
            this.match(Token_1.TipoToken.NUMERO);
            this.LI();
            this.match(Token_1.TipoToken.KW_BREAK);
        }
    };
    AnalizadorSintactico.prototype.DF = function () {
        console.log("Entro a estado: DF()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_DEFAULT) {
            this.match(Token_1.TipoToken.KW_DEFAULT);
            this.match(Token_1.TipoToken.SYM_DOSPUNTOS);
            this.LI();
        }
    };
    AnalizadorSintactico.prototype.SR = function () {
        console.log("Entro a estado: SR()");
        var sentencia;
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_FOR) {
            this.match(Token_1.TipoToken.KW_FOR);
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            this.match(Token_1.TipoToken.KW_INT);
            var variable = this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            this.match(Token_1.TipoToken.SYM_IGUAL);
            var v_inicial = this.VN();
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
            var condicion = this.C();
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
            this.match(Token_1.TipoToken.IDENTIFICADOR);
            this.match(Token_1.TipoToken.SYM_MAS);
            this.match(Token_1.TipoToken.SYM_MAS);
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_LLAVEIZQ);
            var sentencias = this.I();
            this.match(Token_1.TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                sentencia = new SetenciaFor_1.default(variable, v_inicial, condicion, sentencias);
                return sentencia;
            }
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_WHILE) {
            this.match(Token_1.TipoToken.KW_WHILE);
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            var condicion = this.C();
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_LLAVEIZQ);
            var sentencias = this.I();
            this.match(Token_1.TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false && condicion != "") {
                sentencia = new SentenciaWhile_1.default(condicion, sentencias);
                return sentencia;
            }
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_DO) {
            this.match(Token_1.TipoToken.KW_DO);
            this.match(Token_1.TipoToken.SYM_LLAVEIZQ);
            var lista = this.I();
            this.match(Token_1.TipoToken.SYM_LLAVEDER);
            this.match(Token_1.TipoToken.KW_WHILE);
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            var condicion = this.C();
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                sentencia = new SentenciaDoWhile_1.default(condicion, lista);
                return sentencia;
            }
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.SL = function () {
        var sentencia;
        console.log("Entro a estado: SL()");
        if (this.preAnalisis.tipo == Token_1.TipoToken.KW_RETURN) {
            this.match(Token_1.TipoToken.KW_RETURN);
            var cad = "";
            cad += this.RT();
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                return new Return_1.default(cad);
            }
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_CONTINUE) {
            this.match(Token_1.TipoToken.KW_CONTINUE);
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                var cad = "\ncontinue";
                sentencia = new Sentencia_1.default(cad);
                return sentencia;
            }
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_BREAK) {
            this.match(Token_1.TipoToken.KW_BREAK);
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                var cad = "\nbreak";
                sentencia = new Sentencia_1.default(cad);
                return sentencia;
            }
        }
        else if (this.preAnalisis.tipo == Token_1.TipoToken.KW_CONSOLE) {
            this.match(Token_1.TipoToken.KW_CONSOLE);
            this.match(Token_1.TipoToken.SYM_PUNTO);
            this.match(Token_1.TipoToken.KW_WRITE);
            this.match(Token_1.TipoToken.SYM_PARENTESISIZQ);
            var cad = "";
            cad += this.LE();
            this.match(Token_1.TipoToken.SYM_PARENTESISDER);
            this.match(Token_1.TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                var body = "\nprint(" + cad.replace("+", ",") + ")";
                sentencia = new Sentencia_1.default(body);
                return sentencia;
            }
        }
        return undefined;
    };
    AnalizadorSintactico.prototype.LE = function () {
        var cad = "";
        cad += this.VN();
        cad += this.LEP();
        return cad;
    };
    AnalizadorSintactico.prototype.LEP = function () {
        var cad = "";
        if (this.preAnalisis.tipo == Token_1.TipoToken.SYM_MAS) {
            cad += this.preAnalisis.lexema;
            this.match(Token_1.TipoToken.SYM_MAS);
            cad += this.VN();
            cad += this.LEP();
        }
        return cad;
    };
    AnalizadorSintactico.prototype.RT = function () {
        var cad = "";
        console.log("Entro a estado: RT()");
        cad += this.VN();
        cad += this.EX();
        return cad;
    };
    AnalizadorSintactico.prototype.match = function (tipo) {
        if (tipo != this.preAnalisis.tipo) {
            console.log("Se esperaba: " + this.getTipoError(tipo));
            this.flag_error = true;
        }
        if (this.preAnalisis.tipo != Token_1.TipoToken.ULTIMO) {
            this.numPreAnalisis += 1;
            this.preAnalisis = this.listaTokens[this.numPreAnalisis];
        }
    };
    AnalizadorSintactico.prototype.isValid = function (variable) {
        if (variable == undefined || variable == null || variable == "") {
            return false;
        }
        else {
            return true;
        }
    };
    AnalizadorSintactico.prototype.getTipoError = function (tipo, token) {
        //console.log("Se han encontrado errores durante el analisis sintactico!");
        //let cadena: string = "";
        var tp = "";
        switch (tipo) {
            case Token_1.TipoToken.CADENA_HTML:
                tp = "CADENA_HTML";
                break;
            case Token_1.TipoToken.CADENA_SIMPLE:
                tp = "CADENA_SIMPLE";
                break;
            case Token_1.TipoToken.COMENTARIO_ML:
                tp = "COMENTARIO_ML";
                break;
            case Token_1.TipoToken.COMENTARIO_SL:
                tp = "COMENTARIO_SL";
                break;
            case Token_1.TipoToken.ERROR:
                tp = "ERROR";
                break;
            case Token_1.TipoToken.IDENTIFICADOR:
                tp = "IDENTIFICADOR";
                break;
            case Token_1.TipoToken.KW_BOOL:
                tp = "KW_BOOL";
                break;
            case Token_1.TipoToken.KW_BREAK:
                tp = "KW_BREAK";
                break;
            case Token_1.TipoToken.KW_CASE:
                tp = "KW_CASE";
                break;
            case Token_1.TipoToken.KW_CHAR:
                tp = "KW_CHAR";
                break;
            case Token_1.TipoToken.KW_CONSOLE:
                tp = "KW_CONSOLE";
                break;
            case Token_1.TipoToken.KW_CONTINUE:
                tp = "KW_CONTINUE";
                break;
            case Token_1.TipoToken.KW_DO:
                tp = "KW_DO";
                break;
            case Token_1.TipoToken.KW_DOUBLE:
                tp = "KW_DOUBLE";
                break;
            case Token_1.TipoToken.KW_FALSE:
                tp = "KW_FALSE";
                break;
            case Token_1.TipoToken.KW_FOR:
                tp = "KW_FOR";
                break;
            case Token_1.TipoToken.KW_IF:
                tp = "KW_IF";
                break;
            case Token_1.TipoToken.KW_INT:
                tp = "KW_INT";
                break;
            case Token_1.TipoToken.KW_MAIN:
                tp = "KW_MAIN";
                break;
            case Token_1.TipoToken.KW_RETURN:
                tp = "KW_RETURN";
                break;
            case Token_1.TipoToken.KW_STRING:
                tp = "KW_STRING";
                break;
            case Token_1.TipoToken.KW_SWITCH:
                tp = "KW_SWITCH";
                break;
            case Token_1.TipoToken.KW_TRUE:
                tp = "KW_TRUE";
                break;
            case Token_1.TipoToken.KW_VOID:
                tp = "KW_VOID";
                break;
            case Token_1.TipoToken.KW_WHILE:
                tp = "KW_WHILE";
                break;
            case Token_1.TipoToken.KW_WRITE:
                tp = "KW_WRITE";
                break;
            case Token_1.TipoToken.NUMERO:
                tp = "NUMERO";
                break;
            case Token_1.TipoToken.SYM_AND:
                tp = "SYM_AND";
                break;
            case Token_1.TipoToken.SYM_COMA:
                tp = "SYM_COMA";
                break;
            case Token_1.TipoToken.SYM_COMPARACION:
                tp = "SYM_COMPARACION";
                break;
            case Token_1.TipoToken.SYM_DIFERENTFROM:
                tp = "SYM_DIFERENTFROM";
                break;
            case Token_1.TipoToken.SYM_DIVISION:
                tp = "SYM_DIVISION";
                break;
            case Token_1.TipoToken.SYM_IGUAL:
                tp = "SYM_IGUAL";
                break;
            case Token_1.TipoToken.SYM_LLAVEDER:
                tp = "SYM_LLAVEDER";
                break;
            case Token_1.TipoToken.SYM_LLAVEIZQ:
                tp = "SYM_LLAVEIZQ";
                break;
            case Token_1.TipoToken.SYM_MAS:
                tp = "SYM_MAS";
                break;
            case Token_1.TipoToken.SYM_MAYORIGUAL:
                tp = "SYM_MAYORIGUAL";
                break;
            case Token_1.TipoToken.SYM_MAYORQUE:
                tp = "SYM_MAYORQUE";
                break;
            case Token_1.TipoToken.SYM_MENORIGUAL:
                tp = "SYM_MENORIGUAL";
                break;
            case Token_1.TipoToken.SYM_MENORQUE:
                tp = "SYM_MENORQUE";
                break;
            case Token_1.TipoToken.SYM_MENOS:
                tp = "SYM_MENOS";
                break;
            case Token_1.TipoToken.SYM_MULTIPLICACION:
                tp = "SYM_MULTIPLICACION";
                break;
            case Token_1.TipoToken.SYM_NOT:
                tp = "SYM_NOT";
                break;
            case Token_1.TipoToken.SYM_OR:
                tp = "SYM_OR";
                break;
            case Token_1.TipoToken.SYM_PARENTESISDER:
                tp = "SYM_PARENTESISDER";
                break;
            case Token_1.TipoToken.SYM_PARENTESISIZQ:
                tp = "SYM_PARENTESISIZQ";
                break;
            case Token_1.TipoToken.SYM_PUNTO:
                tp = "SYM_PUNTO";
                break;
            case Token_1.TipoToken.SYM_PUNTOYCOMA:
                tp = "SYM_PUNTOYCOMA";
                break;
            case Token_1.TipoToken.KW_ELSE:
                tp = "KW_ELSE";
                break;
            case Token_1.TipoToken.KW_DEFAULT:
                tp = "KW_DEFAULT";
                break;
            case Token_1.TipoToken.CADENA_CHAR:
                tp = "CADENA_CHAR";
                break;
            case Token_1.TipoToken.SYM_DOSPUNTOS:
                tp = "SYM_DOSPUNTOS";
                break;
            case Token_1.TipoToken.ULTIMO:
                tp = "ULTIMO";
                break;
        }
        return tp;
    };
    AnalizadorSintactico.prototype.printLista = function () {
        var size = this.listaTokens.length;
        for (var i = 0; i < size; i++) {
            console.log(this.listaTokens[i].tokenToString() + " Index->" + i);
        }
    };
    AnalizadorSintactico.prototype.joinListas = function (a, b) {
        if (b != undefined) {
            var size = b.length;
            for (var i = 0; i < size; i++) {
                a.push(b[i]);
            }
        }
        return a;
    };
    AnalizadorSintactico.prototype.joinListasIF = function (a, b) {
        if (b != undefined) {
            var size = b.length;
            for (var i = 0; i < size; i++) {
                a.push(b[i]);
            }
        }
        return a;
    };
    AnalizadorSintactico.prototype.getTipo = function (token) {
        return token.tipo;
    };
    return AnalizadorSintactico;
}());
module.exports = AnalizadorSintactico;
