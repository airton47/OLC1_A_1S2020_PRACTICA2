import SentenciaInterface from "./SentenciaInteface";
import Sentencia from "./Sentencia";

class Comentario extends Sentencia{

    cuerpoComentario:string;

    constructor(comentario:string){
        super();
        this.cuerpoComentario = comentario;
    }

    printSentencia(): string {
        let aux:string = this.cuerpoComentario;
        this.cuerpo = this.cuerpoComentario;
        let size:number = aux.length;
        if(1<=size-1){
            if(aux.charAt(0)=="/" && aux.charAt(1)=="/"){
                let longitud:number = this.cuerpoComentario.length;
                aux = aux.slice(2,longitud);
                this.cuerpo = "\n#"+aux;
            }else{
                let longitud:number = this.cuerpoComentario.length-2;
                aux = aux.slice(2,longitud);
                this.cuerpo = "\n\"\""+aux+"\"\"";
            }
        }
        //console.log(this.cuerpo);
        return this.cuerpo;
    }

}

export = Comentario;