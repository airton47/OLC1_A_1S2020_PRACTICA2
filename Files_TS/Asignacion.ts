import Sentencia from "./Sentencia";
import SentenciaInterface from "./SentenciaInteface";

class Asignacion extends Sentencia {

    nombre: string;
    valor: string;
    constructor(name: string, valor: string) {
        super();
        this.valor = valor;
        this.nombre = name;
    }

    printSentencia(): string {
        this.cuerpo = "\n";
        this.cuerpo += this.nombre + " : " + this.valor;
        return this.cuerpo;
    }

}

export = Asignacion;