import SentenciaInterface from "./SentenciaInteface";
import Sentencia from "./Sentencia";

class Procedimiento extends Sentencia{
    //Clase padre para procedimeintos: metodo main,funcion, y metodos en C#
    listaSentencias:Array<SentenciaInterface>;

    constructor(){
        super();
        this.listaSentencias = new Array<SentenciaInterface>();
    }

    public addSentencia(sentencia:SentenciaInterface):void{
        this.listaSentencias.push(sentencia);
    }

    public removeSentecia(index:number):any{
        return this.listaSentencias.splice(index);
    }

    printSentencia(): string {
        
        return this.cuerpo;
        //throw new Error("Method not implemented.");
    }

    public addList(list:Array<Sentencia>):void{
        let size: number = list.length;
        for (let i: number = 0; i < size; i++) {
            this.listaSentencias.push(list[i]);
        }
    }
    
}

export = Procedimiento;