import Sentencia from "./Sentencia";

class SentenciaCase extends Sentencia{
    valor: string;
    sentencia: Sentencia;

    constructor(sentence: Sentencia, value?: string) {

        super();
        if (value != undefined) {
            this.valor = value;
        } else {
            this.valor = "";
        }
        this.sentencia = sentence;
    }

    printSentencia(): string {
        this.cuerpo = '\n' + this.valor + ':' + this.sentencia.printSentencia() + ',';
        return this.cuerpo;
    }
}

export = SentenciaCase;