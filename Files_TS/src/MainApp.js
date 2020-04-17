"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AnalizadorLexico_1 = __importDefault(require("./AnalizadorLexico"));
var AnalizadorSintactico_1 = __importDefault(require("./AnalizadorSintactico"));
var MainApp = /** @class */ (function () {
    function MainApp() {
        this.lista = [];
    }
    MainApp.prototype.analizar = function () {
        var cuerpoPhyton = "";
        var analizador = new AnalizadorLexico_1.default();
        var text = "";
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
        text += "\nvoid sumar ( int a, int b ) { \n";
        text += '\n string name = "colega"; ';
        text += "\n return;";
        text += "\n }";
        analizador.analizar(text);
        //analizador.printLista();
        var parser = new AnalizadorSintactico_1.default();
        var list = analizador.getListaTokens();
        this.lista = list;
        parser.parsear(this.lista);
        var listaSentencias = parser.listaSentencias;
        var size = listaSentencias.length;
        console.log("Elementos en lista de sentencias: " + size);
        for (var i = 0; i < size; i++) {
            cuerpoPhyton += listaSentencias[i].printSentencia();
        }
        console.log(cuerpoPhyton);
        console.log("Elementos en lista de sentencias: " + size);
    };
    MainApp.prototype.main = function () {
        this.analizar();
    };
    return MainApp;
}());
var var_main = new MainApp();
var_main.main();
module.exports = MainApp;
