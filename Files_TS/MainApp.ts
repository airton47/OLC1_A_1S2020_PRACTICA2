import { Token, TipoToken } from "./Token";
import SentenciaInterface from "./SentenciaInteface";
import Sentencia from "./Sentencia";
import AnalizadorLexico from "./AnalizadorLexico";
import AnalizadorSintactico from "./AnalizadorSintactico";
import Declaracion from "./Declaracion";
import Comentario from "./Comentario";

class MainApp {

    salidaTablaVariablesHTML = "";//Tabla con tipo,nombre y linea de las variables
    listaSentencias: Array<SentenciaInterface> = [];//contiene todas las sentencias sin anidarlas
    salidapython: string = "";//texto traducido a python
    salidahtml: string = "";//salida de html obtenido de una cadena html
    salidajson: string = "";//salida de codigo html traducido a json
    entrada: string = "";//entrada para analizar
    lista: Array<Token> = [];//lista de tokens encontrado en texto
    errores: Array<Token> = new Array<Token>();//lista erroes lexicos encontrados
    reporte: string = "";//
    salidaTablaErroresHTML = "";//texto para archivo de errores lexicos y sintactivos
    salidaErroresLexicos = "";
    salidaErroresSintacticos = "";

    analizar(text: string): void {
        let cuerpoPhyton: string = "";
        let analizador = new AnalizadorLexico();
        //let text:string = "";


        analizador.analizar(text);//analiz0 lexicamente
        analizador.printLista();//visulizo la lista de tokens
        let parser = new AnalizadorSintactico();
        let list: Array<Token> = analizador.getListaTokens();//obtengo la lista de tokens del analizador
        this.lista = this.removerErrores(list);//remuevo los tokens de error de la lista

        parser.parsear(this.lista);//analizo sintacticamente

        let listaSentencias: Array<SentenciaInterface> = parser.listaSentencias;//obtengo la lista de sentencias
        let size = listaSentencias.length;
        //console.log("Elementos en lista de sentencias: "+size);
        let sentencia: SentenciaInterface;
        for (let i: number = 0; i < size; i++) {//recorro la lista y obtengo salida traducida
            sentencia = listaSentencias[i];
            if (sentencia instanceof Comentario) {
                let flag: boolean = (sentencia as Comentario).isSingleLine;
                if (flag == true) {
                    cuerpoPhyton += sentencia.printSentencia();
                } else {
                    cuerpoPhyton += '\n' + sentencia.printSentencia();
                }

            } else {
                cuerpoPhyton += '\n' + sentencia.printSentencia();
            }
        }
        console.log(cuerpoPhyton);//imprimo la lista traducida
        this.listaSentencias = parser.listaGeneralSentencias;//guardo la lista de sentencias en variable de main
        this.salidapython = cuerpoPhyton;//guardo salida de python en variable de main
        console.log("Elementos en lista de sentencias: " + size);
        console.log('Nummero de errores encontrados: '+parser.listaErrores.length);
        this.salidaTablaVariablesHTML = this.generarReporteTablaVariables();//genero texto html de tabla con las variables
        this.salidahtml = this.generarSalidaHtml(analizador.lista);//guardo cadena de html en variable de main
       
        this.generarSalidaJson(analizador.lista);//genero y guardo de formato json traducido del html
        this.generarReporteErrores(this.errores, parser.listaErrores);
    }

    generarReporteErrores(lexicos: Array<Token>, sintacticos: Array<Token>): string {
        let html: string = "\n<html>";
        html += "\n<head>";
        html += "\n<style> table, td, th { border: 1px solid #ddd;    text-align: center;} table {border-collapse: collapse;    width: 100%;} th, td { padding: 15px;} </style>";
        html += "\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />";
        html += "\n<title>" + "REPORTES DE ERRORES" + "</title>";
        html += "\n</head>";
        html += "\n<body>";
        html += "\n<table>";
        
        html += "\n<tr><td> NO. </td> <td>TIPO ERROR</td> <td>LINEA </td> <td>COLUMNA</td> <td>DESCRIPCION</td></tr>";
        let size: number = lexicos.length;
        let token:Token;
        let contador:number = 1;
        for (let i: number = 0; i < size; i++) {
            token = lexicos[i];
            html += "\n<tr><td>"+contador+" </td> <td>LEXICO</td> <td>"+token.linea+"</td> <td>"+token.columna+"</td> <td>El simbolo: "+token.lexema+" no pertenece al lenguaje</td></tr>";
            contador++;
        }
        let size1:number = sintacticos.length;
        let token1:Token;
        for (let i: number = 0; i < size1; i++) {
            token1 = lexicos[i];
            //html += "\n<tr><td>"+contador+" </td> <td>SINTACTICO</td> <td>"+token1.linea+"</td> <td>"+token1.columna+"</td> <td>"+token1.descripcion+"</td></tr>";
            contador++;
        }
        html += ("\n</table>");
        html += "\n</body>";
        html += "\n</html>"
        this.salidaTablaErroresHTML = html;
        return html;
    }

    generarSalidaHtml(lista: Array<Token>): string {
        let html = "";
        let size: number = lista.length;
        let token: Token;
        for (let i: number = 0; i < size; i++) {
            token = lista[i];
            if (token.tipo == TipoToken.CADENA_HTML) {
                let text: string = token.lexema;
                //text = text.replace("'", "");
                //text = text.replace("'", "");
                var re = /'/g;
                var resultado = text.replace(re, "");
                html = resultado;
                break;
            }
        }
        return html;
    }

    generarSalidaJson(lista: Array<Token>): string {
        let html = "";
        let size: number = lista.length;
        let token: Token;
        for (let i: number = 0; i < size; i++) {
            token = lista[i];
            if (token.tipo == TipoToken.CADENA_HTML) {
                let text: string = token.lexema;
                //text = text.replace("'", "");
                //text = text.replace("'", "");
                var re = /'/g;
                var resultado = text.replace(re, "");
                html = resultado;
                break;
            }
        }
        let salidajson = html;

        var re = /<html>/g;
        var resultado = salidajson.replace(re, '"html":{');
        salidajson = resultado;

        var re = /<[/]html>/g;
        var resultado = salidajson.replace(re, '}');
        salidajson = resultado;

        var re = /<head>/g;
        var resultado = salidajson.replace(re, '"head":{');
        salidajson = resultado;

        var re = /<[/]head>/g;
        var resultado = salidajson.replace(re, '},');
        salidajson = resultado;

        var re = /<tittle>/g;
        var resultado = salidajson.replace(re, '"tittle":{\n\t\t\t"TEXTO":');
        salidajson = resultado;

        var re = /<[/]tittle>/g;
        var resultado = salidajson.replace(re, '\n\t\t}');
        salidajson = resultado;

        var re = /<body/g;
        var resultado = salidajson.replace(re, '"body":{');
        salidajson = resultado;

        var re = /< body/g;
        var resultado = salidajson.replace(re, '"body":{');
        salidajson = resultado;

        var re = /<[/]body>/g;
        var resultado = salidajson.replace(re, '}');
        salidajson = resultado;

        var re = /style =/g;
        var resultado = salidajson.replace(re, '\n\t\t"style":');
        salidajson = resultado;

        var re = /style=/g;
        var resultado = salidajson.replace(re, '\n\t\t"style":\n');
        salidajson = resultado;

        var re = /<h1>/g;
        var resultado = salidajson.replace(re, '"h1":{\n\t\t\t"TEXTO":');
        salidajson = resultado;

        var re = /<[/]h1>/g;
        var resultado = salidajson.replace(re, '\n\t\t},');
        salidajson = resultado;

        var re = /<h2>/g;
        var resultado = salidajson.replace(re, '"h2":{\n\t\t\t"TEXTO":');
        salidajson = resultado;

        var re = /<[/]h2>/g;
        var resultado = salidajson.replace(re, '\n\t\t},');
        salidajson = resultado;

        var re = /<p>/g;
        var resultado = salidajson.replace(re, '"p":{ \n\t\t\t"TEXTO":');
        salidajson = resultado;

        var re = /<[/]p>/g;
        var resultado = salidajson.replace(re, '\n\t\t\t},');
        salidajson = resultado;

        var re = /<div>/g;
        var resultado = salidajson.replace(re, '"div":{\n\t\t\t');
        salidajson = resultado;

        var re = /<div/g;
        var resultado = salidajson.replace(re, '"div":{\n\t\t\t');
        salidajson = resultado;

        var re = /<[/]div>/g;
        var resultado = salidajson.replace(re, '\n\t\t},');
        salidajson = resultado;

        var re = /<label>/g;
        var resultado = salidajson.replace(re, '"label":{\n\t\t\t"TEXTO":');
        salidajson = resultado;

        var re = /<[/]label>/g;
        var resultado = salidajson.replace(re, '\n\t\t},');
        salidajson = resultado;

        var re = /<button>/g;
        var resultado = salidajson.replace(re, '"button":{\n\t\t\t"TEXTO":');
        salidajson = resultado;

        var re = /<[/]button>/g;
        var resultado = salidajson.replace(re, '\n\t\t},');
        salidajson = resultado;

        var re = /<br>/g;
        var resultado = salidajson.replace(re, '\n\t\t"br":{"TEXTO": " "\n\t\t},');
        salidajson = resultado;

        var re = /<input>/g;
        var resultado = salidajson.replace(re, '\n\t\t"input":{\n\t\t},');
        salidajson = resultado;

        var re = />/g;
        var resultado = salidajson.replace(re, ',');
        salidajson = resultado;


        console.log(salidajson);
        return salidajson;
    }

    generarReporteTablaVariables(): string {
        let html: string = "\n<html>";
        html += "\n<head>";
        html += "\n<style> table, td, th { border: 1px solid #ddd;    text-align: center;} table {border-collapse: collapse;    width: 100%;} th, td { padding: 15px;} </style>";
        html += "\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />";
        html += "\n<title>" + "REPORTES DE APLICACION" + "</title>";
        html += "\n</head>";
        html += "\n<body>";
        html += "\n<table>";
        html += "\n<tr><td> NOMBRE </td><td> TIPO </td> <td> LINEA </td> </tr>";
        let size: number = this.listaSentencias.length;
        let sentencia: SentenciaInterface;
        for (let i: number = 0; i < size; i++) {
            sentencia = this.listaSentencias[i];
            if (sentencia instanceof Declaracion) {
                html += "\n<tr><td> " + sentencia.nombre + " </td><td> " + sentencia.tipo + " </td> <td> " + sentencia.linea + " </td> </tr>";
            }
        }
        html += ("\n</table>");
        html += "\n</body>";
        html += "\n</html>"

        return html;
    }

    removerErrores(lista: Array<Token>): Array<Token> {
        let size: number = lista.length;
        let listaux: Array<Token> = new Array<Token>();
        for (let i: number = 0; i < size; i++) {
            let aux: Token = lista[i];
            if (aux.tipo != TipoToken.ERROR) {
                listaux.push(aux);
            } else {
                this.errores.push(aux);
            }
        }

        return listaux;
    }

    main(entrada: string) {
        this.entrada = entrada;
        this.analizar(entrada);
    }
}
export = MainApp;
let var_main = new MainApp();
let entrada: string = 'Console.Write("El analisis comenzara!");';
entrada += 'int a  123';
entrada += 'int analisis = 13;';
entrada += 'int anular = 0;';
var_main.main(entrada);
let python: string = var_main.salidapython;

var cadena: string = "Test abc test test abc test test test abc test test abc";
var re = /abc/g;
var resultado = cadena.replace(re, '');
console.log(resultado);



/*

const fs = require('fs');
var var_main = new MainApp();
let entrada = 'Console.Write("Comienza el analisis");';
fs.readFile('entrada.cs', 'utf-8', (error, datos) => {
    if (error) {
        throw error;
    } else {
        entrada += datos.toString();
        var_main.main(entrada);
        var python = var_main.salidapython;
        //console.log(python);
        //Genera la archivo con tabla de variables encontradas
        var tablavariables = var_main.salidaTablaVariablesHTML;
        fs.writeFile('variables.html', tablavariables, (error) => {
            if (error) {
                throw error;
            }
            console.log("El reporte de variables ha sido creado con exito");
        });
        //Genera archivo con tabla de errores encontrados durante el analisis
        var tablaErrores = var_main.salidaTablaErroresHTML;
        fs.writeFile('errores.html', tablaErrores, (error) => {
            if (error) {
                throw error;
            }
            console.log("El reporte de errores ha sido creado con exito");
        });        
    }
});

*/





