import AnalizadorLexico from "./AnalizadorLexico";
import AnalizadorSintactico from "./AnalizadorSintactico";
import { Token, TipoToken } from "./Token";
import SentenciaInterface from "./SentenciaInteface";
import Sentencia from "./Sentencia";

class MainApp {

    salidapython: string = "";
    salidahtml: string = "";
    salidajson: string = "";
    entrada:string = "";
    lista: Array<Token> = [];
    errores: Array<Token> = new Array<Token>();
    reporte:string = "";

    analizar(text:string): void {
        let cuerpoPhyton: string = "";
        let analizador = new AnalizadorLexico();
        //let text:string = "";
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
        text += "\n void sumar ( int a, int b ) { \n";
        text += '\n string name = "colega"; ';
        text += "\n return;";
        text += "\n }";
        text += "\n string getName(int a) { \n";
        text += 'string name = "name:"+a; ';
        text += 'return a;';
        text += '\n }';
        text += "\n void main() { \n";
        text += 'Console.Write("This is a main() method!"); ';
        //text += 'void saludar(string saludo){ Console.Write("Este es un saludo: "+saludo) } ; ';
        text += 'return a;';
        text += '? °';
        text += '\n }';
        text += 'for ( int index = 0 ; i < 10 ; i++ ) { } ';
        text += 'while ( a < 123 ) { int a = 123; } ';
        text += 'do { Console.Write("Hello World!"); } while ( a<45 ) ;';
        text += 'if ( a > 0 ) { Console.Write("Mensaje"); int a = 123; }';
        text += 'else if(j>12){Console.Write("Mensaje2");}';
        text += 'else if(j>1){Console.Write("Mensaje3");}';
        //text += "Console.Write('<body></body>');";
        analizador.analizar(text);
        analizador.printLista();
        let parser = new AnalizadorSintactico();
        let list: Array<Token> = analizador.getListaTokens();
        this.lista = this.removerErrores(list);

        parser.parsear(this.lista);
        let listaSentencias: Array<SentenciaInterface> = parser.listaSentencias;
        let size = listaSentencias.length;
        console.log("Elementos en lista de sentencias: "+size);
        for (let i: number = 0; i < size; i++) {
            cuerpoPhyton += listaSentencias[i].printSentencia();
        }
        console.log(cuerpoPhyton);
        this.salidapython = cuerpoPhyton;
        console.log("Elementos en lista de sentencias: "+size);
    }

    generarReporte():void{

    }

    removerErrores(lista:Array<Token>):Array<Token>{
        let size: number = lista.length;
        let listaux:Array<Token> = new Array<Token>();
        for(let i:number = 0;i<size;i++){
            let aux:Token = lista[i];
            if(aux.tipo != TipoToken.ERROR){
                listaux.push(aux);
            }else{
                this.errores.push(aux);
            }
        }

        return listaux;
    }

    main(entrada:string) {
        this.entrada = entrada;
        this.analizar(entrada);
    }
}

let var_main = new MainApp();
let entrada:string = 'Console.Write("Comienza el analisis");';
var_main.main(entrada);

export = MainApp;
