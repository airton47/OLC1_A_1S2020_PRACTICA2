import Sentencia from "./Sentencia";

class SentenciaWhile extends Sentencia{

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
        this.cuerpo = "\nwhile "+this.condicion;
        let size:number = this.sentencias.length;
        for(let i= 0;i<size;i++){
        this.cuerpo+= '\t'+ this.sentencias[i].printSentencia();
        }
        return this.cuerpo;
    }
}
export = SentenciaWhile;