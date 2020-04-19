import Sentencia from "./Sentencia";

class SentenciaIF extends Sentencia {

    condicion: string;//CONDICION PRINCIPAL DEL IF
    listaIfs?: Array<SentenciaIF>;//Lista de else if's anidados
    listaSentencias: Array<Sentencia>;//lista de sentencias del if principal

    constructor(c: string, lista?: Array<Sentencia>, listifs?: Array<SentenciaIF>) {
        super();
        this.condicion = c;
        if (lista != undefined) {
            this.listaSentencias = lista;
        } else {
            this.listaSentencias = new Array<Sentencia>();
        }
        if (listifs != undefined) {
            this.listaIfs = listifs;
        }
    }

    printSentencia(): string {
        this.cuerpo = "\nif " + this.condicion + " :\n";
        let size: number = this.listaSentencias.length;
        for (let i: number = 0; i < size; i++) {
            this.cuerpo += "\t" + this.listaSentencias[i].printSentencia();
        }
        if (this.listaIfs != undefined) {
            size = this.listaIfs.length;
            let ifactual:SentenciaIF;
            for (let i: number = 0; i < size; i++) {
                ifactual = this.listaIfs[i];
                this.cuerpo += "\nelif " + ifactual.condicion+ " :\n";
                if(ifactual.listaSentencias!=undefined){
                    let size1:number = ifactual.listaSentencias.length;
                    for(let i:number = 0;i<size1;i++){
                        this.cuerpo += '\t'+ifactual.listaSentencias[i].printSentencia();
                    }
                }
            }
        }
        return this.cuerpo;
    }
}
export = SentenciaIF;