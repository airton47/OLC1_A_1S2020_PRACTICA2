import SentenciaInterface from "./SentenciaInteface";

class Sentencia implements SentenciaInterface{

    cuerpo:string = "";

    constructor(body?:string){
        if(body!=undefined){
            this.cuerpo = body;
        }
    }

    printSentencia(): string {
        //this.cuerpo+="\n";
        return this.cuerpo;
    }

}

export = Sentencia;