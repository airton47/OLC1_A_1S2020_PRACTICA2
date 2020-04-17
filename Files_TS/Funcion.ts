import SentenciaInterface from "./SentenciaInteface";
import Procedimiento from "./Procedimiento";

class Funcion extends Procedimiento {

    nombre: string;
    tipoRetorno: string;
    listaParametros: Array<SentenciaInterface>;

    constructor(name: string,retorno:string) {
        super();
        this.nombre = name;
        this.listaParametros = new Array<SentenciaInterface>();
        this.tipoRetorno = retorno;
    }

    printSentencia(): string {
        let cuerpo: string = "Print para Metodo";
        cuerpo += "\ndef " + this.nombre + "(";
        let size: number = this.listaParametros.length;
        for (let i: number = 0; i < size; i++) {
            if (i == size - 1) {
                cuerpo += this.listaParametros[i];
            } else {
                cuerpo += this.listaParametros[i] + ",";
            }
        }
        cuerpo += "):\n";
        cuerpo += "\t";
        size = this.listaSentencias.length;
        for (let i: number = 0; i < size; i++) {
            cuerpo += "\t" + this.listaSentencias[i].printSentencia();
        }

        console.log(cuerpo);
        return cuerpo;
    }

}
export = Funcion;