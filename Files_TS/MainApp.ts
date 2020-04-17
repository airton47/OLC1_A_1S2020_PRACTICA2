import AnalizadorLexico from "./AnalizadorLexico";
import AnalizadorSintactico from "./AnalizadorSintactico";
import { Token } from "./Token";
import SentenciaInterface from "./SentenciaInteface";
import Sentencia from "./Sentencia";

class MainApp {

    lista: Array<Token> = [];

    analizar(): void {
        let cuerpoPhyton: string = "";
        let analizador = new AnalizadorLexico();
        let text:string = "";
        text += 'return 6+8; string a = "loser"+b; string a_A = "amigo"; int b = 1 + 3; bool j = getBool(12,b);';
        text += '\n/*Esto es un comentario multilinea*/'
        text += '\n//amigo esto es una comentario\n';
        text += '\n saludo_espaniol = "hola!";';
        text += '\n Console.Write("Hello World!"+a+234+amigo+" "+true);';
        text += "\n break;";
        text += "\n continue;";
        text += "\n int a = 1 + 2 ; ";
        text += '\n string name = "colega"; ';
        text += 'string cadena = "Esta es mi cadena!" ; ';
        text += "\nvoid sumar ( int a, int b ) { \n";
        text += '\n string name = "colega"; ';
        text += "\n return;";
        text += "\n }";
        analizador.analizar(text);
        //analizador.printLista();
        let parser = new AnalizadorSintactico();
        let list: Array<Token> = analizador.getListaTokens();
        this.lista = list;

        parser.parsear(this.lista);
        let listaSentencias: Array<SentenciaInterface> = parser.listaSentencias;
        let size = listaSentencias.length;
        console.log("Elementos en lista de sentencias: "+size);
        for (let i: number = 0; i < size; i++) {
            cuerpoPhyton += listaSentencias[i].printSentencia();
        }
        console.log(cuerpoPhyton);
        console.log("Elementos en lista de sentencias: "+size);
    }


    main() {
        this.analizar();
    }
}

let var_main = new MainApp();
var_main.main();

export = MainApp;
