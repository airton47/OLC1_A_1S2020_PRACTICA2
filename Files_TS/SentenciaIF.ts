import Sentencia from "./Sentencia";

class SentenciaIF extends Sentencia {

    condicion: string;//CONDICION PRINCIPAL DEL IF
    listaIfs?: Array<SentenciaIF>;//Lista de else if's anidados
    listaSentencias: Array<Sentencia>;//lista de sentencias del if principal

    constructor(c?: string, lista?: Array<Sentencia>, listifs?: Array<SentenciaIF>) {
        super();
        if(c!=undefined){
            this.condicion = c;
        }else{
            this.condicion = "";
        }
        
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
        this.cuerpo = "if " + this.condicion + " :";
        let size: number = this.listaSentencias.length;
        for (let i: number = 0; i < size; i++) {
            this.cuerpo += "\n\t" + this.listaSentencias[i].printSentencia();
        }
        if (this.listaIfs != undefined) {
            size = this.listaIfs.length;
            let ifactual:SentenciaIF;
            for (let i: number = 0; i < size; i++) {
                ifactual = this.listaIfs[i];
                if(ifactual.condicion == ""){
                    this.cuerpo += "\nelse " + ifactual.condicion+ " :";
                }else{
                    this.cuerpo += "\nelif " + ifactual.condicion+ " :";
                }
                if(ifactual.listaSentencias!=undefined){
                    let size1:number = ifactual.listaSentencias.length;
                    for(let i:number = 0;i<size1;i++){
                        this.cuerpo += "\n\t" + ifactual.listaSentencias[i].printSentencia();
                    }
                }
            }
        }
        return this.cuerpo;
    }
}
export = SentenciaIF;