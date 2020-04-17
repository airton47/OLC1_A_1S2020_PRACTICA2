import Sentencia from "./Sentencia";

class Return extends Sentencia {

    valor?: string;

    constructor(vl?: string) {
        super();
        if (vl != undefined) {
            this.valor = vl;
        }
    }

    printSentencia(): string {
        this.cuerpo = "\nreturn ";
        if (this.valor != undefined) {
            this.cuerpo += this.valor;
        }
        //console.log(this.cuerpo);
        return this.cuerpo;
    }
}
export = Return;