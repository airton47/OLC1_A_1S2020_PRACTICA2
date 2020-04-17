import Sentencia from "./Sentencia";

class SentenciaIF extends Sentencia{

    condicion:Array<string>;
    listaSentecias:Array<Sentencia>;

    constructor(c:Array<string>,lista?:Array<Sentencia>){
        super();
        this.condicion = c;
        if(lista!=undefined){
            this.listaSentecias = lista;
        }else{
            this.listaSentecias = new Array<Sentencia>();
        }
    }

    printSentencia(): string{
        this.cuerpo = "\nif " +this.condicion[0]+" :\n";
        let size:number = this.listaSentecias.length;
        for(let i:number = 1;i<size;i++){
            this.cuerpo += "\t"+this.listaSentecias[i].printSentencia();
        }
        return this.cuerpo;
    }
}
export = SentenciaIF;