import Procedimiento from "./Procedimiento";
import SentenciaInterface from "./SentenciaInteface";
import Sentencia from "./Sentencia";

class MetodoMain extends Procedimiento {

    constructor(sentencias?: Array<Sentencia>) {
        super();
        if (sentencias != undefined) {
            this.addList(sentencias);
        }
    }

    printSentencia(): string {
        this.cuerpo = "\ndef " + "main(";        
        this.cuerpo += "):\n";
        let size: number = 0;
        size = this.listaSentencias.length;
        for (let i: number = 0; i < size; i++) {
            this.cuerpo += "\t" + this.listaSentencias[i].printSentencia()+"";
        }
        this.cuerpo += '\nif __name__="__main__":\n';
        this.cuerpo += '\tmain()\n';
        //console.log(this.cuerpo);
        return this.cuerpo;
    }
}
export = MetodoMain;
let varr: SentenciaInterface = new MetodoMain();
if (varr instanceof Procedimiento) {
    console.log("El objeto varr es un instancia de la clase Procedimiento, por lo tanto implementa a Sentencia Interface")
}
console.log(varr.printSentencia());