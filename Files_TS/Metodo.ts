import Procedimiento from "./Procedimiento";
import SentenciaInterface from "./SentenciaInteface";
import Sentencia from "./Sentencia";

class Metodo extends Procedimiento {
    //Los metodos no tienen tipo de retorno solo hacen alguna accion
    nombre: string;
    listaParametros: string;

    constructor(name: string,listpar?:string,listinst?:Array<Sentencia>) {
        super();
        this.nombre = name;
        if(listpar!=undefined){
            this.listaParametros = listpar;
        }else{
            this.listaParametros = "";
        }
        if(listinst!=undefined){
            this.addList(listinst);
        }
    }

    printSentencia(): string {
        
        this.cuerpo += "def " + this.nombre + "(";
        let size: number = 0;
        this.cuerpo += this.listaParametros;
        this.cuerpo += "):";
        size = this.listaSentencias.length;
        for (let i: number = 0; i < size; i++) {
            this.cuerpo += "\n\t" + this.listaSentencias[i].printSentencia();
        }

        //console.log(this.cuerpo);
        return this.cuerpo;
    }

}

export = Metodo;