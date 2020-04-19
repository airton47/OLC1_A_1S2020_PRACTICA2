import SentenciaInterface from "./SentenciaInteface";
import Sentencia from "./Sentencia";

class Declaracion extends Sentencia implements SentenciaInterface {

    nombre: string;
    expresion?: string;

    constructor(name: string, valor?: string) {
        super();
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
        this.cuerpo = "\nvar " +this.nombre ;
        if (this.isEXpDefined()) {
            this.cuerpo += " : ";
            this.cuerpo += this.expresion;
        }
        //console.log(this.cuerpo);
        return this.cuerpo;
    }

}

export = Declaracion;