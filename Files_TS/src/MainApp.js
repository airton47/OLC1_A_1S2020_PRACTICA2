"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Token_1 = require("./Token");
var AnalizadorLexico_1 = __importDefault(require("./AnalizadorLexico"));
var AnalizadorSintactico_1 = __importDefault(require("./AnalizadorSintactico"));
var Declaracion_1 = __importDefault(require("./Declaracion"));
var Comentario_1 = __importDefault(require("./Comentario"));
var MainApp = /** @class */ (function () {
    function MainApp() {
        this.salidaTablaVariablesHTML = ""; //Tabla con tipo,nombre y linea de las variables
        this.listaSentencias = []; //contiene todas las sentencias sin anidarlas
        this.salidapython = ""; //texto traducido a python
        this.salidahtml = ""; //salida de html obtenido de una cadena html
        this.salidajson = ""; //salida de codigo html traducido a json
        this.entrada = ""; //entrada para analizar
        this.lista = []; //lista de tokens encontrado en texto
        this.errores = new Array(); //erroes lexicos encontrados
        this.reporte = ""; //
        this.salidaTablaErroresHTML = ""; //texto para archivo de errores lexicos y sintactivos
    }
    MainApp.prototype.analizar = function (text) {
        var cuerpoPhyton = "";
        var analizador = new AnalizadorLexico_1.default();
        //let text:string = "";
        analizador.analizar(text);
        analizador.printLista();
        var parser = new AnalizadorSintactico_1.default();
        var list = analizador.getListaTokens();
        this.lista = this.removerErrores(list);
        parser.parsear(this.lista);
        var listaSentencias = parser.listaSentencias;
        var size = listaSentencias.length;
        //console.log("Elementos en lista de sentencias: "+size);
        var sentencia;
        for (var i = 0; i < size; i++) {
            sentencia = listaSentencias[i];
            if (sentencia instanceof Comentario_1.default) {
                var flag = sentencia.isSingleLine;
                if (flag == true) {
                    cuerpoPhyton += sentencia.printSentencia();
                }
                else {
                    cuerpoPhyton += '\n' + sentencia.printSentencia();
                }
            }
            else {
                cuerpoPhyton += '\n' + sentencia.printSentencia();
            }
        }
        console.log(cuerpoPhyton);
        this.listaSentencias = parser.listaGeneralSentencias;
        this.salidapython = cuerpoPhyton;
        console.log("Elementos en lista de sentencias: " + size);
        this.salidaTablaVariablesHTML = this.generarReporteTablaVariables();
        this.salidahtml = this.generarSalidaHtml(analizador.lista);
        console.log();
        this.generarSalidaJson(analizador.lista);
    };
    MainApp.prototype.generarReporteErrores = function () {
        var html = "";
        return html;
    };
    MainApp.prototype.generarSalidaHtml = function (lista) {
        var html = "";
        var size = lista.length;
        var token;
        for (var i = 0; i < size; i++) {
            token = lista[i];
            if (token.tipo == Token_1.TipoToken.CADENA_HTML) {
                var text = token.lexema;
                //text = text.replace("'", "");
                //text = text.replace("'", "");
                var re = /'/g;
                var resultado = text.replace(re, "");
                html = resultado;
                break;
            }
        }
        return html;
    };
    MainApp.prototype.generarSalidaJson = function (lista) {
        var html = "";
        var size = lista.length;
        var token;
        for (var i = 0; i < size; i++) {
            token = lista[i];
            if (token.tipo == Token_1.TipoToken.CADENA_HTML) {
                var text = token.lexema;
                //text = text.replace("'", "");
                //text = text.replace("'", "");
                var re = /'/g;
                var resultado = text.replace(re, "");
                html = resultado;
                break;
            }
        }
        var salidajson = html;
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
    };
    MainApp.prototype.generarReporteTablaVariables = function () {
        var html = "\n<html>";
        html += "\n<head>";
        html += "\n<style> table, td, th { border: 1px solid #ddd;    text-align: center;} table {border-collapse: collapse;    width: 100%;} th, td { padding: 15px;} </style>";
        html += "\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />";
        html += "\n<title>" + "REPORTES DE APLICACION" + "</title>";
        html += "\n</head>";
        html += "\n<body>";
        html += "\n<table>";
        html += "\n<tr><td> NOMBRE </td><td> TIPO </td> <td> LINEA </td> </tr>";
        var size = this.listaSentencias.length;
        var sentencia;
        for (var i = 0; i < size; i++) {
            sentencia = this.listaSentencias[i];
            if (sentencia instanceof Declaracion_1.default) {
                html += "\n<tr><td> " + sentencia.nombre + " </td><td> " + sentencia.tipo + " </td> <td> " + sentencia.linea + " </td> </tr>";
            }
        }
        html += ("\n</table>");
        html += "\n</body>";
        html += "\n</html>";
        return html;
    };
    MainApp.prototype.removerErrores = function (lista) {
        var size = lista.length;
        var listaux = new Array();
        for (var i = 0; i < size; i++) {
            var aux = lista[i];
            if (aux.tipo != Token_1.TipoToken.ERROR) {
                listaux.push(aux);
            }
            else {
                this.errores.push(aux);
            }
        }
        return listaux;
    };
    MainApp.prototype.main = function (entrada) {
        this.entrada = entrada;
        this.analizar(entrada);
    };
    return MainApp;
}());
var var_main = new MainApp();
var entrada = ''; //
var_main.main(entrada);
var python = var_main.salidapython;
var cadena = "Test abc test test abc test test test abc test test abc";
var re = /abc/g;
var resultado = cadena.replace(re, '');
console.log(resultado);
module.exports = MainApp;
//const fs = require('fs');
/*

const fs = require('fs');
var var_main = new MainApp();
let entrada = 'Console.Write("Comienza el analisis");';
fs.readFile('entrada.cs','utf-8',(error,datos)=>{
    if(error){
        throw error;
    }else{
        entrada += datos.toString();
        //var_main.main(entrada);
        var python = var_main.salidapython;
        console.log(python);
    }
});





fs.readFile('entrada.cs','utf-8',(error,datos)=>{
    if(error){
        throw error;
    }else{
        console.log(datos);
    }

});

var tablavariables = var_main.salidaTablaVariablesHTML;
fs.appendFile('reporte.html',tablavariables,(error)=>{
    if(error){
        throw error;

    }
    console.log("El reporte ha sido creado con exito");
});
*/
