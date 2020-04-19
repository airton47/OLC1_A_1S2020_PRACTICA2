import { Token, TipoToken } from "./Token";
import SentenciaInterface from "./SentenciaInteface";
import Procedimiento from "./Procedimiento";
import Sentencia from "./Sentencia";
import Declaracion from "./Declaracion";
import Comentario from "./Comentario";
import Asignacion from "./Asignacion";
import Return from "./Return";
import Metodo from "./Metodo";
import Funcion from "./Funcion";
import MetodoMain from "./MetodoMain";
import SentenciaFor from "./SetenciaFor";
import SentenciaWhile from "./SentenciaWhile";
import SentenciaDoWhile from "./SentenciaDoWhile";
import SentenciaIF from "./SentenciaIF";

class AnalizadorSintactico {
    //Atributos necesarios para hacer analisis sitactico
    listaTokens!: Array<Token>;
    listaSentencias: Array<Sentencia>;
    preAnalisis!: Token;
    numPreAnalisis: number;
    flag_error: boolean;

    constructor() {
        this.listaSentencias = new Array<Sentencia>();
        this.numPreAnalisis = 0;
        this.flag_error = false;
        //this.preAnalisis = new Token(TipoToken.ULTIMO, "");
        //this.listaTokens = new Array<Token>();
    }

    public parsear(tokens: Array<Token>): void {
        console.log("Empieza el analisis sintactico!");
        this.listaTokens = tokens;
        //this.listaTokens.reverse;
        let index: number = 0;
        this.preAnalisis = this.listaTokens[index];
        this.numPreAnalisis = 0;
        //this.printLista();
        console.log(this.listaTokens.length);
        this.START();
    }

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
    START(): any {
        this.joinListas(this.listaSentencias, this.LI());
        if (this.preAnalisis.tipo == TipoToken.ULTIMO) {
            this.match(TipoToken.ULTIMO);
            return;
        }
        //console.log(this.listaSentencias);
    }

    LI(): Array<Sentencia> {
        let sentencia: Sentencia | undefined;
        let lista: Array<Sentencia> = new Array<Sentencia>();
        console.log("Entro a estado: LI()");
        if (this.preAnalisis.tipo == TipoToken.ULTIMO) {
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
    }

    public LIP(): Array<Sentencia> {
        let lista: Array<Sentencia> = new Array<Sentencia>();
        let sentencia: Sentencia | undefined;
        console.log("Entro a estado: LIP()");
        
        sentencia = this.S();
        if (sentencia != null || sentencia != undefined) {
            lista.push(sentencia);
        }
        if (this.preAnalisis.tipo == TipoToken.ULTIMO) {
            return lista;
        }else{
            let lista_aux: Array<Sentencia> = this.joinListas(lista, this.LIP());
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
    }

    public S(): Sentencia | undefined {
        let sentencia: Sentencia | undefined;
        console.log("Entro a estado: S()");

        //this.CM();
        sentencia = this.CM();//COMENTARIOS MULTI-LINE O SINBLE-LINE
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.FN();
        //sentencia = this.FN();
        //if (sentencia != undefined || sentencia != null) {
        //
        //}
        sentencia = this.DFN();//Para declaraciones de variables o funciones con tipo de retorno
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.A();
        sentencia = this.A();//PARA ASIGNACION A VARIABLES
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.M();
        sentencia = this.M();//PARA METODOS VOID
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        //this.SC();
        sentencia = this.SC();
        if(sentencia!= undefined || sentencia != null){
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
    }

    public CM(): Sentencia | undefined {
        let sentencia: Sentencia | undefined = undefined;
        let cad: string = "";
        console.log("Entro a estado: CM()");
        if (this.preAnalisis.tipo == TipoToken.COMENTARIO_ML) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.COMENTARIO_ML);
            sentencia = new Comentario(cad);
        } else if (this.preAnalisis.tipo == TipoToken.COMENTARIO_SL) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.COMENTARIO_SL)
            sentencia = new Comentario(cad);
        }
        return sentencia;
    }

    public DFN(): Sentencia | undefined {
        console.log("Entro a estado: DFN()");
        let sentencia: Sentencia | undefined;
        let flag: boolean = this.T();
        if (flag == false) {
            return undefined;
        }
        if (this.preAnalisis.tipo == TipoToken.IDENTIFICADOR) {
            let id: string = this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            sentencia = this.DFNP(id);
            return sentencia;
        }
        return undefined;
    }

    private DFNP(id: string): Sentencia | undefined {
        console.log("Entro a estado: DFNP()");
        let sentencia: Sentencia | undefined;
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
    }

    private DEF(id: string): Sentencia | undefined {
        console.log("Entro a estado: DEF()");
        let sentencia: Sentencia;
        let cad: string = "";
        cad += this.LV();
        cad += this.AS();
        if (this.preAnalisis.tipo == TipoToken.SYM_PUNTOYCOMA) {
            this.match(TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false && this.flag_error == false) {
                sentencia = new Declaracion(id, cad);
                return sentencia;
            } else {
                this.flag_error = false;
            }
        }
        return undefined;
    }

    private D(): Sentencia | undefined {
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
    }

    public T(): boolean {
        let flag: boolean = false;
        console.log("Entro a estado: T()");
        if (this.preAnalisis.tipo == TipoToken.KW_INT) {
            this.match(TipoToken.KW_INT);
            flag = true;
        } else if (this.preAnalisis.tipo == TipoToken.KW_STRING) {
            this.match(TipoToken.KW_STRING);
            flag = true;
        } else if (this.preAnalisis.tipo == TipoToken.KW_DOUBLE) {
            this.match(TipoToken.KW_DOUBLE);
            flag = true;
        } else if (this.preAnalisis.tipo == TipoToken.KW_BOOL) {
            this.match(TipoToken.KW_BOOL);
            flag = true;
        } else if (this.preAnalisis.tipo == TipoToken.KW_CHAR) {
            this.match(TipoToken.KW_CHAR);
            flag = true;
        }
        return flag;
    }

    public LV(): string {
        let listvars: string = "";
        console.log("Entro a estado: LV()");
        if (this.preAnalisis.tipo == TipoToken.SYM_COMA) {
            listvars += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_COMA);
            listvars += this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            listvars += this.LV();
            return listvars;
        } else {
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
    }

    public LVP(): string {
        let vars: string = "";
        console.log("Entro a estado: LVP()");
        if (this.preAnalisis.tipo == TipoToken.SYM_COMA) {
            vars += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_COMA);
            vars += this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            vars += this.LVP();
        }
        return vars;
    }

    public AS(): string {
        let cad: string = "";
        console.log("Entro a estado: AS()");
        if (this.preAnalisis.tipo == TipoToken.SYM_IGUAL) {
            this.match(TipoToken.SYM_IGUAL);
            cad += this.EX();
        }
        return cad;
    }

    public EX(): string {
        let cad: string = "";
        console.log("Entro a estado: EX()");
        if (this.preAnalisis.tipo == TipoToken.IDENTIFICADOR) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_PARENTESISIZQ);
            cad += this.LP();
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_PARENTESISDER);

        }
        cad += this.VN();
        cad += this.E();

        return cad;
    }

    public LP(): string {
        let cad: string = "";
        console.log("Entro a estado: LP()");
        cad += this.VN();
        cad += this.LPP();

        return cad;
    }

    public LPP(): string {
        let cad: string = "";
        console.log("Entro a estado: LPP()");
        if (this.preAnalisis.tipo == TipoToken.SYM_COMA) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_COMA);
            cad += this.VN();
            cad += this.LPP();
        }
        return cad;
    }

    public VN(): string {
        let cad: string = "";
        console.log("Entro a estado: VN()");
        if (this.preAnalisis.tipo == TipoToken.CADENA_CHAR) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.CADENA_CHAR);
        } else if (this.preAnalisis.tipo == TipoToken.CADENA_SIMPLE) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.CADENA_SIMPLE);
        } else if (this.preAnalisis.tipo == TipoToken.CADENA_HTML) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.CADENA_HTML);
        } else if (this.preAnalisis.tipo == TipoToken.NUMERO) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.NUMERO);
        } else if (this.preAnalisis.tipo == TipoToken.KW_TRUE) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.KW_TRUE);
        } else if (this.preAnalisis.tipo == TipoToken.KW_FALSE) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.KW_FALSE);
        } else if (this.preAnalisis.tipo == TipoToken.IDENTIFICADOR) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
        }
        return cad;
    }

    public E(): string {
        let cad: string = "";
        console.log("Entro a estado: E()");
        cad += this.TT();
        cad += this.EP();

        return cad;
    }

    public EP(): string {
        let cad: string = "";
        console.log("Entro a estado: EP()");
        if (this.preAnalisis.tipo == TipoToken.SYM_MAS) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_MAS);
            cad += this.TT();
            cad += this.EP();
            return cad;
        } else if (this.preAnalisis.tipo == TipoToken.SYM_MENOS) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_MENOS);
            cad += this.TT();
            cad += this.EP();
            return cad;
        }
        return cad;
    }

    public TT(): string {
        let cad: string = "";
        console.log("Entro a estado: TT()");
        cad += this.F();
        cad += this.TTP();

        return cad;
    }

    public TTP(): string {
        let cad: string = "";
        console.log("Entro a estado: TPP()");
        if (this.preAnalisis.tipo == TipoToken.SYM_MULTIPLICACION) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_MULTIPLICACION);
            cad += this.F();
            cad += this.TTP();
            return cad;
        } else if (this.preAnalisis.tipo == TipoToken.SYM_DIVISION) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_DIVISION);
            cad += this.F();
            cad += this.TTP();
            return cad;
        }
        return cad;
    }

    public F(): string {
        let cad: string = "";
        console.log("Entro a estado: F()");
        if (this.preAnalisis.tipo == TipoToken.NUMERO) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.NUMERO);
            return cad;
        } else if (this.preAnalisis.tipo == TipoToken.IDENTIFICADOR) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            return cad;
        } else if (this.preAnalisis.tipo == TipoToken.SYM_PARENTESISIZQ) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_PARENTESISIZQ);
            cad += this.E();
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_PARENTESISDER);
            return cad;
        }
        return "";
    }

    public A(): Sentencia | undefined {
        let asignacion: Sentencia;
        console.log("Entro a estado: A()");
        if (this.preAnalisis.tipo == TipoToken.IDENTIFICADOR) {
            let cad1: string = this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            this.match(TipoToken.SYM_IGUAL);
            let cad: string = "";
            cad += this.EX();
            this.match(TipoToken.SYM_PUNTOYCOMA);
            if (this.isValid(cad) == true && this.flag_error == false) {
                asignacion = new Asignacion(cad1, cad);
                asignacion.printSentencia();
                return asignacion
            }
            this.flag_error = false;
        }
        return undefined;
    }

    public M(): Sentencia | undefined {
        let sentencia: Sentencia | undefined;
        console.log("Entro a estado: M()");
        if (this.preAnalisis.tipo == TipoToken.KW_VOID) {
            this.match(TipoToken.KW_VOID);
            let id: string = this.preAnalisis.lexema;
            let tipo: TipoToken = this.getTipo(this.preAnalisis);
            if (tipo == TipoToken.KW_MAIN) {
                sentencia = this.MN();
                if (sentencia != undefined && this.flag_error == false) {
                    return sentencia;
                }
            }
            this.match(TipoToken.IDENTIFICADOR);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            let parametros: string = "";
            parametros += this.P();
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_LLAVEIZQ);
            let list: Array<Sentencia> | undefined = this.I();
            this.match(TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                sentencia = new Metodo(id, parametros, list);
                return sentencia;
            }
        }
        return undefined;
    }

    public P(): string {
        let cad: string = "";
        console.log("Entro a estado: P()");
        cad += this.LLP();
        return cad;
    }

    public LLP(): string {
        let cad: string = "";
        console.log("Entro a estado: LLP()");

        this.T();
        if (this.preAnalisis.tipo == TipoToken.IDENTIFICADOR) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            cad += this.LLPP();
        }
        return cad;
    }

    public LLPP(): string {
        let cad: string = "";
        console.log("Entro a estado: LLPP()");
        if (this.preAnalisis.tipo == TipoToken.SYM_COMA) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_COMA);
            this.T();
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            cad += this.LLPP();
        }
        return cad;
    }

    public I(): Array<Sentencia> | undefined {
        let list: Array<Sentencia>;
        console.log("Entro a estado: I()");
        list = this.LIV2();
        if (this.flag_error == false && list != undefined) {
            return list;
        }
        return undefined;
    }

    LIV2(): Array<Sentencia> {
        let sentencia: Sentencia | undefined;
        let lista: Array<Sentencia> = new Array<Sentencia>();
        console.log("Entro a estado: LIV2()");
        if (this.preAnalisis.tipo == TipoToken.SYM_LLAVEDER) {
            return lista;
        }
        sentencia = this.SV2();
        if (sentencia != undefined || sentencia != null) {
            lista.push(sentencia);
        }
        this.joinListas(lista, this.LIPV2());
        return lista;
    }

    public LIPV2(): Array<Sentencia> {
        let lista: Array<Sentencia> = new Array<Sentencia>();
        let sentencia: Sentencia | undefined;
        console.log("Entro a estado: LIPV2()");
        if (this.preAnalisis.tipo == TipoToken.SYM_LLAVEDER) {
            return lista;
        }
        sentencia = this.SV2();
        if (sentencia != null || sentencia != undefined) {
            lista.push(sentencia);
        }
        return this.joinListas(lista, this.LIPV2());
    }

    public SV2(): Sentencia | undefined {
        let sentencia: Sentencia | undefined;
        console.log("Entro a estado: SV2()");

        sentencia = this.CM();//COMENTARIOS MULTI-LINE O SINBLE-LINE
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        sentencia = this.D();//Para declaraciones de variables
        if (sentencia != undefined || sentencia != null) {
            return sentencia;
        }
        sentencia = this.A();//PARA ASIGNACION A VARIABLES
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
    }

    public FN(id: string): Sentencia | undefined {
        let sentencia: Sentencia;
        console.log("Entro a estado: FN()");
        if (this.preAnalisis.tipo == TipoToken.SYM_PARENTESISIZQ) {
            this.match(TipoToken.SYM_PARENTESISIZQ);
            let parametros: string = "";
            parametros += this.P();
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_LLAVEIZQ);
            let lista: Array<Sentencia> | undefined = this.I();
            this.match(TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                sentencia = new Funcion(id, parametros, lista);
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
    }

    public MN(): Sentencia | undefined {//Metodo MAIN
        console.log("Entro a estado: MN()");
        let sentencia: Sentencia | undefined;
        if (this.preAnalisis.tipo == TipoToken.KW_MAIN) {
            this.match(TipoToken.KW_MAIN);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_LLAVEIZQ);
            let lista: Array<Sentencia> | undefined = this.I();
            this.match(TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                sentencia = new MetodoMain(lista);
                return sentencia;
            } else {
                this.flag_error = false;
            }
        }
        return undefined;
    }

    public SC(): Sentencia  |undefined {
        console.log("Entro a estado: SC()");
        let sentencia:Sentencia | undefined;
        if(this.preAnalisis.tipo == TipoToken.KW_IF){
            sentencia = this.IF();
        }        
        if(sentencia!= undefined){
            return sentencia;
        }
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
    }

    public IF(): Sentencia | undefined {
        console.log("Entro a estado: IF()");
        let sentencia: Sentencia;
        if (this.preAnalisis.tipo == TipoToken.KW_IF) {
            this.match(TipoToken.KW_IF);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            let condicion: string = this.C();
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_LLAVEIZQ);
            let lista: Array<Sentencia> | undefined = this.I();
            this.match(TipoToken.SYM_LLAVEDER);
            let listaanidados: Array<SentenciaIF> | undefined = this.ANI();
            if (this.flag_error == false) {
                sentencia = new SentenciaIF(condicion, lista, listaanidados);
                return sentencia;
            } else {
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
    }

    private ANI(): Array<SentenciaIF> | undefined {
        console.log('Entro a estado: ANI()');
        let lista: Array<SentenciaIF> | undefined;
        return lista = this.LANI();
    }

    private LANI(): Array<SentenciaIF> | undefined {
        console.log('Entro a estado : LANI()');
        let listaifs: Array<SentenciaIF> = new Array<SentenciaIF>();
        let elifsentencia: SentenciaIF | undefined = this.ELIF();
        if (elifsentencia != undefined) {
            listaifs.push(elifsentencia);
        }
        if(this.preAnalisis.tipo == TipoToken.KW_ELSE){
            let aux: Array<SentenciaIF>|undefined = this.joinListasIF(listaifs,this.LANI());
            return aux;   
                    
        }else{
            return listaifs;
        }
        
        //return undefined;
    }

    private ELIF(): SentenciaIF | undefined {
        console.log('Entro a estado: ELIF()');
        let senif: SentenciaIF;
        if (this.preAnalisis.tipo == TipoToken.KW_ELSE) {
            this.match(TipoToken.KW_ELSE);
            this.match(TipoToken.KW_IF);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            let condicion: string = this.C();
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_LLAVEIZQ);
            let sentencias: Array<Sentencia> | undefined = this.I();
            this.match(TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                senif = new SentenciaIF(condicion, sentencias);
                console.log(senif.printSentencia());
                return senif;
            }
        }
        return undefined;
    }    

    public C(): string {
        let condicion: string = "";
        console.log("Entro a estado: C()");
        if (this.preAnalisis.tipo == TipoToken.SYM_NOT) {
            this.match(TipoToken.SYM_NOT);
            condicion += "not ";
            condicion += this.VN();
            condicion += this.OP();
            condicion += this.VN();
        }
        condicion += this.VN();
        condicion += this.OP();
        condicion += this.VN();
        return condicion;
    }

    public OP(): string {
        let operacion: string = "";
        console.log("Entro a estado: OP()");
        if (this.preAnalisis.tipo == TipoToken.SYM_MAYORQUE) {
            this.match(TipoToken.SYM_MAYORQUE);
            operacion = ">";
        } else if (this.preAnalisis.tipo == TipoToken.SYM_MAYORIGUAL) {
            this.match(TipoToken.SYM_MAYORIGUAL);
            operacion = ">=";
        } else if (this.preAnalisis.tipo == TipoToken.SYM_MENORQUE) {
            this.match(TipoToken.SYM_MENORQUE);
            operacion = "<";
        } else if (this.preAnalisis.tipo == TipoToken.SYM_MENORIGUAL) {
            this.match(TipoToken.SYM_MENORIGUAL);
            operacion = "<=";
        } else if (this.preAnalisis.tipo == TipoToken.SYM_COMPARACION) {
            this.match(TipoToken.SYM_COMPARACION);
            operacion = "==";
        } else if (this.preAnalisis.tipo == TipoToken.SYM_DIFERENTFROM) {
            this.match(TipoToken.SYM_DIFERENTFROM);
            operacion = "!=";
        } else if (this.preAnalisis.tipo == TipoToken.SYM_AND) {
            this.match(TipoToken.SYM_AND);
            operacion = "and";
        } else if (this.preAnalisis.tipo == TipoToken.SYM_OR) {
            this.match(TipoToken.SYM_OR);
            operacion = "or";
        }
        return operacion;
    }

    public SW(): any {
        console.log("Entro a estado: SW()");
        this.CS();
        this.SWP();
    }

    public SWP(): any {
        console.log("Entro a estado: SWP()");
        this.CS()
        this.SWP();
    }

    public CS(): any {
        console.log("Entro a estado: CS()");
        if (this.preAnalisis.tipo == TipoToken.KW_CASE) {
            this.match(TipoToken.KW_CASE);
            this.match(TipoToken.SYM_DOSPUNTOS);
            this.match(TipoToken.NUMERO);
            this.LI();
            this.match(TipoToken.KW_BREAK)
        }
    }

    public DF(): any {
        console.log("Entro a estado: DF()");
        if (this.preAnalisis.tipo == TipoToken.KW_DEFAULT) {
            this.match(TipoToken.KW_DEFAULT);
            this.match(TipoToken.SYM_DOSPUNTOS);
            this.LI();
        }
    }

    public SR(): Sentencia | undefined {
        console.log("Entro a estado: SR()");
        let sentencia: Sentencia | undefined;
        if (this.preAnalisis.tipo == TipoToken.KW_FOR) {
            this.match(TipoToken.KW_FOR);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            this.match(TipoToken.KW_INT);
            let variable: string = this.preAnalisis.lexema;
            this.match(TipoToken.IDENTIFICADOR);
            this.match(TipoToken.SYM_IGUAL);
            let v_inicial: string = this.VN();
            this.match(TipoToken.SYM_PUNTOYCOMA);
            let condicion: string = this.C();
            this.match(TipoToken.SYM_PUNTOYCOMA);
            this.match(TipoToken.IDENTIFICADOR);
            this.match(TipoToken.SYM_MAS);
            this.match(TipoToken.SYM_MAS);
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_LLAVEIZQ);
            let sentencias: Array<Sentencia> | undefined = this.I();
            this.match(TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false) {
                sentencia = new SentenciaFor(variable, v_inicial, condicion, sentencias);
                return sentencia;
            }
        } else if (this.preAnalisis.tipo == TipoToken.KW_WHILE) {
            this.match(TipoToken.KW_WHILE);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            let condicion: string = this.C();
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_LLAVEIZQ);
            let sentencias: Array<Sentencia> | undefined = this.I();
            this.match(TipoToken.SYM_LLAVEDER);
            if (this.flag_error == false && condicion != "") {
                sentencia = new SentenciaWhile(condicion, sentencias);
                return sentencia;
            }
        } else if (this.preAnalisis.tipo == TipoToken.KW_DO) {
            this.match(TipoToken.KW_DO);
            this.match(TipoToken.SYM_LLAVEIZQ);
            let lista: Array<Sentencia> | undefined = this.I();
            this.match(TipoToken.SYM_LLAVEDER);
            this.match(TipoToken.KW_WHILE);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            let condicion: string = this.C();
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                sentencia = new SentenciaDoWhile(condicion, lista);
                return sentencia;
            }
        }
        return undefined;
    }

    SL(): Sentencia | undefined {//Sentencias locales: Console.Write(), return, contine y break
        let sentencia: Sentencia;
        console.log("Entro a estado: SL()");
        if (this.preAnalisis.tipo == TipoToken.KW_RETURN) {
            this.match(TipoToken.KW_RETURN);
            let cad: string = "";
            cad += this.RT();
            this.match(TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                return new Return(cad);
            }
        } else if (this.preAnalisis.tipo == TipoToken.KW_CONTINUE) {
            this.match(TipoToken.KW_CONTINUE);
            this.match(TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                let cad: string = "\ncontinue";
                sentencia = new Sentencia(cad);
                return sentencia;
            }
        } else if (this.preAnalisis.tipo == TipoToken.KW_BREAK) {
            this.match(TipoToken.KW_BREAK);
            this.match(TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                let cad: string = "\nbreak";
                sentencia = new Sentencia(cad);
                return sentencia;
            }
        } else if (this.preAnalisis.tipo == TipoToken.KW_CONSOLE) {
            this.match(TipoToken.KW_CONSOLE);
            this.match(TipoToken.SYM_PUNTO);
            this.match(TipoToken.KW_WRITE);
            this.match(TipoToken.SYM_PARENTESISIZQ);
            let cad: string = "";
            cad += this.LE();
            this.match(TipoToken.SYM_PARENTESISDER);
            this.match(TipoToken.SYM_PUNTOYCOMA);
            if (this.flag_error == false) {
                let body: string = "\nprint(" + cad.replace("+", ",") + ")";
                sentencia = new Sentencia(body);
                return sentencia;
            }
        }

        return undefined;
    }

    private LE(): string {
        let cad: string = "";
        cad += this.VN();
        cad += this.LEP();
        return cad;
    }

    private LEP(): string {
        let cad: string = "";
        if (this.preAnalisis.tipo == TipoToken.SYM_MAS) {
            cad += this.preAnalisis.lexema;
            this.match(TipoToken.SYM_MAS);
            cad += this.VN();
            cad += this.LEP();
        }
        return cad
    }

    public RT(): String {
        let cad: string = "";
        console.log("Entro a estado: RT()");
        cad += this.VN();
        cad += this.EX();
        return cad;
    }

    public match(tipo: TipoToken) {
        if (tipo != this.preAnalisis.tipo) {
            console.log("Se esperaba: " + this.getTipoError(tipo));
            this.flag_error = true;
        }
        if (this.preAnalisis.tipo != TipoToken.ULTIMO) {
            this.numPreAnalisis += 1;
            this.preAnalisis = this.listaTokens[this.numPreAnalisis];
        }
    }

    private isValid(variable: string): boolean {
        if (variable == undefined || variable == null || variable == "") {
            return false;
        } else {
            return true;
        }
    }

    public getTipoError(tipo: TipoToken,token?:Token): string {
        //console.log("Se han encontrado errores durante el analisis sintactico!");
        //let cadena: string = "";
        let tp = "";
        switch (tipo) {
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

    public printLista(): void {
        let size: number = this.listaTokens.length;
        for (let i: number = 0; i < size; i++) {
            console.log(this.listaTokens[i].tokenToString() + " Index->" + i);
        }
    }

    private joinListas(a: Array<Sentencia>, b: Array<Sentencia> | undefined): Array<Sentencia> {
        if (b != undefined) {
            let size: number = b.length;
            for (let i: number = 0; i < size; i++) {
                a.push(b[i]);
            }
        }
        return a;
    }

    private joinListasIF(a: Array<SentenciaIF>, b: Array<SentenciaIF> | undefined): Array<SentenciaIF> {
        if (b != undefined) {
            let size: number = b.length;
            for (let i: number = 0; i < size; i++) {
                a.push(b[i]);
            }
        }
        return a;
    }

    private getTipo(token: Token): TipoToken {
        return token.tipo;
    }
}

export = AnalizadorSintactico;