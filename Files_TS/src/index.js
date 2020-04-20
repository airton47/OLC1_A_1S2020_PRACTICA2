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
var python = var_main.salidapython;
console.log(python);
module.exports = MainApp;



var contador=0;
function get_cont(){
    return contador++;
}

var vent_focus="pestana1";
function get_vent(){
    return vent_focus;
}

function set_vent(vent){
    vent_focus=vent;
}



var lista=new Array();
function linkedlist(pestana,nombre) {
    var obj=new Object();
    obj.pestana=pestana;
    obj.nombre=nombre;
    lista.push(obj);
}

function deletepes(pestana){
    for(var i=0;i<lista.length;i++){
        if(lista[i].pestana==pestana){
            delete lista[i];
        }
    }
}


function startAnalisis(){
    console.log("Se iniciara con el analisis de la entrada");
    var entrada = "int a = 234;";
    
    
}

function settextboxes(){
    var contenido=document.getElementById("divpython");//El div en donde se pondra el textarea
    var divp=document.createElement("div");//El div donde se pondra el editor de texto
    divp.setAttribute('id','edi_python');
    var tap=document.createElement("textarea");//Es el textarea para la salida
    tap.setAttribute('id','ta_python');
    tap.setAttribute('name','ta_python');
    tap.setAttribute('class','ta');
    tap.setAttribute('style','display:none');
    tap.cols=123;
    tap.rows=30;
    divp.appendChild(tap);
    contenido.appendChild(divp);

    var act=document.getElementById('edi_python');
    var tact=document.getElementById('ta_python');
    var editor=CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "eclipse",
        mode: "text/x-csharp"
    }).on('change', editor => {
        tact.value=editor.getValue();
    });
    
}

/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestania) {
    var id=pestania.replace('pestana','');
    set_vent('textarea'+id);

    var pestanna1 = document.getElementById(pestania);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('c'+pestania);
    var listacPestannas = document.getElementById('contenido'+pestanias);

    var i=0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom','');
        });
        i += 1;
    }

    $(document).ready(function(){
        $(cpestanna).css('display','');
        $(pestanna1).css('background','dimgray');
        $(pestanna1).css('padding-bottom','2px');
    });

    try {
        var act=document.getElementById('cpestana'+id);
        var tact=document.getElementById('textarea'+id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-csharp"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    }catch(error) {}
}

/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar() {
    var x=get_cont();
    var lu=document.getElementById("lista");
    var li=document.createElement("li");
    li.setAttribute('id','pestana'+x);
    var a=document.createElement("a");
    a.setAttribute('id','a'+x);
    a.setAttribute('href', 'javascript:index("pestanas","pestana'+x+'")');
    a.text='pestana'+x;
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas","pestana"+x);

    var contenido=document.getElementById("contenidopestanas");
    var divp=document.createElement("div");
    divp.setAttribute('id','cpestana'+x);
    var ta=document.createElement("textarea");
    ta.setAttribute('id','textarea'+x);
    ta.setAttribute('name','textarea'+x);
    ta.setAttribute('class','ta');
    ta.setAttribute('style','display:none');
    ta.cols=123;
    ta.rows=30;
    divp.appendChild(ta);
    contenido.appendChild(divp);

    var act=document.getElementById('cpestana'+x);
    var tact=document.getElementById('textarea'+x);
    var editor=CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "eclipse",
        mode: "text/x-csharp"
    }).on('change', editor => {
        tact.value=editor.getValue();
    });
}

function quitar(){
    try{
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea","pestana")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea","cpestana")));
        deletepes(get_vent());
    }catch(error){}
}


/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var act=document.getElementById(get_vent().replace("textarea","cpestana"));
        var tact=document.getElementById(get_vent());
        tact.value = e.target.result;

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "eclipse",
            mode: "text/x-csharp"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    };
    reader.readAsText(file);
    file.clear;

    var a=document.getElementById(get_vent().replace("textarea","a"));
    a.text=file.name;
    linkedlist(get_vent(),file.name);

    var file_input=document.getElementById("fileInput");
    document.getElementById('fileInput').value="";
}

function DescargarArchivo(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato=get_vent().replace("textarea","")+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre="Archivo"+formato+".coline";//nombre del archivo
    var file=new Blob([contenido], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}
