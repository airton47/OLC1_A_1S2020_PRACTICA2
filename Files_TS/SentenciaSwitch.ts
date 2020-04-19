import Sentencia from "./Sentencia";

class SentenciaSwitch extends Sentencia{

    variable:string;

    constructor(variable:string){
        super();
        this.variable = variable;
    }

    printSentencia():string{
        this.cuerpo = '\ndef switcher('+this.variable+'):';
        return this.cuerpo;
    }

}
export = SentenciaSwitch;