"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AnalizadorLexico_1 = __importDefault(require("./AnalizadorLexico"));
var AnalizadorSintactico_1 = __importDefault(require("./AnalizadorSintactico"));
var Token_1 = require("./Token");
var MainApp = /** @class */ (function () {
    function MainApp() {
        this.salidapython = "";
        this.salidahtml = "";
        this.salidajson = "";
        this.entrada = "";
        this.lista = [];
        this.errores = new Array();
        this.reporte = "";
    }
    MainApp.prototype.analizar = function (text) {
        var cuerpoPhyton = "";
        var analizador = new AnalizadorLexico_1.default();
        //let text:string = "";
        text += 'return 6+8; string a = "loser"+b; string a_A = "amigo"; int b = 1 + 3; bool j = getBool(12,b);';
        text += '\n/*Esto es un comentario multilinea*/';
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
        var parser = new AnalizadorSintactico_1.default();
        var list = analizador.getListaTokens();
        this.lista = this.removerErrores(list);
        parser.parsear(this.lista);
        var listaSentencias = parser.listaSentencias;
        var size = listaSentencias.length;
        console.log("Elementos en lista de sentencias: " + size);
        for (var i = 0; i < size; i++) {
            cuerpoPhyton += listaSentencias[i].printSentencia();
        }
        console.log(cuerpoPhyton);
        this.salidapython = cuerpoPhyton;
        console.log("Elementos en lista de sentencias: " + size);
    };
    MainApp.prototype.generarReporte = function () {
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
module.exports = MainApp;
