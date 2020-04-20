import Sentencia from "./Sentencia";

class SentenciaDoWhile extends Sentencia{

    condicion:string;
    sentencias:Array<Sentencia>;

    constructor(condicion:string,lista?:Array<Sentencia>){
        super();
        this.condicion = condicion;
        if(lista!=undefined){
            this.sentencias = lista;
        }else{
            this.sentencias = new Array<Sentencia>();
        }
    }

    printSentencia(): string{
        this.cuerpo = 'while True:\n';
        
        let size: number = this.sentencias.length;
        for(let i:number = 0;i<size;i++){
            this.cuerpo += '\n\t'+this.sentencias[i].printSentencia();
        }
        this.cuerpo += '\n\tif ('+this.condicion+'):\n';
        this.cuerpo += '\tbreak;';
        return this.cuerpo;
    }
}
export = SentenciaDoWhile;