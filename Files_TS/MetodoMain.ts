import Procedimiento from "./Procedimiento";
import SentenciaInterface from "./SentenciaInteface";

class MetodoMain extends Procedimiento{

    constructor(){
        super();
    }

    printSentencia(): string {
        this.cuerpo = "I will never let you win.";
        return this.cuerpo;
        //throw new Error("Method not implemented.");
    }
}
export = MetodoMain;
let varr:SentenciaInterface = new MetodoMain();
if(varr instanceof Procedimiento){
    console.log("El objeto varr es un instancia de la clase Procedimiento, por lo tanto implementa a Sentencia Interface")
}
console.log(varr.printSentencia());