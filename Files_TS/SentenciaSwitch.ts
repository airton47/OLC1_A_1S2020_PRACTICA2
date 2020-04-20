import Sentencia from "./Sentencia";
import SentenciaCase from "./SentenciaCase";

class SentenciaSwitch extends Sentencia {

    variable: string;
    cases: Array<SentenciaCase>;

    constructor(variable: string, lista: Array<SentenciaCase>) {
        super();
        this.variable = variable;
        this.cases = lista;
    }

    printSentencia(): string {
        this.cuerpo = 'def switch(' + this.variable + ','+'):';
        this.cuerpo += '\tswitcher = {'
        let size: number = this.cases.length;
        let auxcase: SentenciaCase;
        for (let i: number = 0; i < size; i++) {
            auxcase = this.cases[i];
            if (auxcase.valor != "") {
                this.cuerpo += '\n\t' + auxcase.valor + ':' + auxcase.sentencia.printSentencia()+',';
            } else {
                this.cuerpo += '\n\t'+this.getLast()+':' + auxcase.sentencia.printSentencia()+',';
            }
        }
        this.cuerpo += '\n\t}'
        return this.cuerpo;
    }

    private getLast(): string {
        let cad: string = "";
        let index: number = this.cases.length - 2;
        let valor_num:string;
        if(index>0){
            valor_num = this.cases[index].valor;
        }else{
            valor_num = '100';
        }        
        let numero:number = parseInt(valor_num)+1;
        cad = numero.toString();
        return cad;
    }

}

export = SentenciaSwitch;