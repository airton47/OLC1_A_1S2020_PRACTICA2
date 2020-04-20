"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Token_1 = require("./Token");
var AnalizadorLexico_1 = __importDefault(require("./AnalizadorLexico"));
var AnalizadorSintactico_1 = __importDefault(require("./AnalizadorSintactico"));
var Declaracion_1 = __importDefault(require("./Declaracion"));
var MainApp = /** @class */ (function () {
    function MainApp() {
        this.salidaTablaVariablesHTML = "";
        this.listaSentencias = [];
        this.salidapython = "";
        this.salidahtml = "";
        this.salidajson = "";
        this.entrada = "";
        this.lista = [];
        this.errores = new Array();
        this.reporte = "";
        this.salidaTablaErroresHTML = "";
    }
    MainApp.prototype.analizar = function (text) {
        var cuerpoPhyton = "";
        var analizador = new AnalizadorLexico_1.default();
        //let text:string = "";
        text += 'return 6+8; string a = "loser"+b; string a_A = "amigo"; int b = 1 + 3; bool j = getBool(12,b);\n';
        text += '\n /*Esto es un comentario multilinea*/\n';
        text += '\n //amigo esto es una comentario\n';
        text += '\n saludo_espaniol = "hola!";';
        text += '\n Console.Write("Hello World!"+a+234+amigo+" "+true);';
        text += "\n break;";
        text += "\n continue;";
        text += "\n int a = 1 + 2 ; ";
        text += '\n string name = "colega"; ';
        text += '\n string cadena = "Esta es mi cadena!" ; ';
        text += "\n void sumar ( int a, int b ) { \n";
        text += '\n string name = "colega"; ';
        text += "\n return;";
        text += "\n }";
        text += "\n string getName(int a) { \n";
        text += 'string name = "name:"+a; ';
        text += 'return a;';
        text += '\n }';
        text += "\n void main() { \n";
        text += 'if(a<4){return j;}';
        text += 'Console.Write("This is a main() method!"); ';
        //text += 'void saludar(string saludo){ Console.Write("Este es un saludo: "+saludo) } ; ';
        text += 'return a;';
        text += '? °';
        text += '\n }';
        text += 'for ( int index = 0 ; i < 10 ; i++ ) { if(a<13){int a = 233; return a;} } ';
        text += 'while ( a < 123 ) { int a = 123; } ';
        text += 'do { Console.Write("Hello World!"); } while ( a<45 ) ;';
        text += 'if ( a > 0 ) { Console.Write("Mensaje"); int a = 123; }';
        text += 'else if(j>12){Console.Write("Mensaje2");    }';
        text += 'else if(j>1){Console.Write("Mensaje3");}';
        //text += 'altura = 123;';
        text += 'switch ( index ) { case 1: price = 12; break; default: Console.Write("No valido"); }';
        analizador.analizar(text);
        analizador.printLista();
        var parser = new AnalizadorSintactico_1.default();
        var list = analizador.getListaTokens();
        this.lista = this.removerErrores(list);
        parser.parsear(this.lista);
        var listaSentencias = parser.listaSentencias;
        var size = listaSentencias.length;
        //console.log("Elementos en lista de sentencias: "+size);
        for (var i = 0; i < size; i++) {
            cuerpoPhyton += listaSentencias[i].printSentencia();
        }
        console.log(cuerpoPhyton);
        this.listaSentencias = parser.listaGeneralSentencias;
        this.salidapython = cuerpoPhyton;
        console.log("Elementos en lista de sentencias: " + size);
        console.log(this.generarReporteTabla());
    };
    MainApp.prototype.generarReporteErrores = function () {
        var html = "";
        return html;
    };
    MainApp.prototype.generarReporteTabla = function () {
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
var entrada = 'Console.Write("Comienza el analisis");';
var_main.main(entrada);
var python = var_main.salidapython;
module.exports = MainApp;
