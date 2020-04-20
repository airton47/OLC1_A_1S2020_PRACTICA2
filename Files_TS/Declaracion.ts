import SentenciaInterface from "./SentenciaInteface";
import Sentencia from "./Sentencia";

class Declaracion extends Sentencia implements SentenciaInterface {

    linea: number;
    nombre: string;
    expresion?: string;
    tipo:string;

    constructor(name: string,tipo:string,linea:number, valor?: string) {
        super();
        this.tipo = tipo;
        this.linea = linea;
        this.nombre = name;
        if (valor != undefined) {
            this.expresion = valor;
        } else {
            this.expresion = "";
        }
    }

    private isEXpDefined(): boolean {
        if (this.expresion == undefined || this.expresion == "") {
            return false;
        } else {
            return true;
        }
    }

    printSentencia(): string {
        this.cuerpo = "var " +this.nombre ;
        if (this.isEXpDefined()) {
            this.cuerpo += " : ";
            this.cuerpo += this.expresion;
        }
        //console.log(this.cuerpo);
        return this.cuerpo;
    }

}

export = Declaracion;