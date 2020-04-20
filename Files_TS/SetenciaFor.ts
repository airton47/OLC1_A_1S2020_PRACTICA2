import Sentencia from "./Sentencia";

class SentenciaFor extends Sentencia{

    varible:string;//Variable que usa para hacer incremento
    valor:string;//El valor inicial de la varible que incrementara
    condicion:string;//Condicion que indica cuando se detendra
    sentencias:Array<Sentencia>;//lista de sentencias anidadas
    delimitador:string;

    constructor(variable:string,valor:string,condicion:string,lista?:Array<Sentencia>){
        super();
        this.valor = valor;
        this.varible = variable;
        this.condicion = condicion;
        let sp:Array<string> = this.condicion.split("<");
        this.delimitador = sp[1];
        if(lista!=undefined){
            this.sentencias = lista;
        }else{
            this.sentencias = new Array<Sentencia>();
        }
    }

    printSentencia(): string{
        this.cuerpo ='for '+this.varible + ' in range('+this.valor+','+this.delimitador+')';
        let size:number = this.sentencias.length;
        for(let i:number = 0;i<size;i++){
            this.cuerpo += '\n\t'+ this.sentencias[i].printSentencia();
        }
        return this.cuerpo;
    }

    private getNumber(cad:string):number{
        let numero:number = 0;
        let aux: number = cad.charCodeAt(0);
        if(aux>48 && aux<52){
            aux = aux+1;
            numero = aux;
        }
        return numero;
    }
}

export = SentenciaFor;