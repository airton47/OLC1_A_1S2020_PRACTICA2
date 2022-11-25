



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
    /*--------------------------------------------------------- */
    /*--------------------------------------------------------- */
    var contenidoht=document.getElementById("divhtml");//El div en donde se pondra el textarea
    var divpht=document.createElement("div");//El div donde se pondra el editor de texto
    divpht.setAttribute('id','edi_html');
    var tapht=document.createElement("textarea");//Es el textarea para la salida
    tapht.setAttribute('id','ta_html');
    tapht.setAttribute('name','ta_html');
    tapht.setAttribute('class','ta');
    tapht.setAttribute('style','display:none');
    tapht.cols=123;
    tapht.rows=30;
    divpht.appendChild(tapht);
    contenidoht.appendChild(divpht);

    var actht=document.getElementById('edi_html');
    var tactht=document.getElementById('ta_html');
    var editorht=CodeMirror(actht, {
        lineNumbers: true,
        value: tactht.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "defualt",
        mode: "text/html"
    }).on('change', editorht => {
        tactht.value=editorht.getValue();
    });
    /*--------------------------------------------------------- */
    /*--------------------------------------------------------- */
    var contenidojson=document.getElementById("divjson");//El div en donde se pondra el textarea
    var divpjson=document.createElement("div");//El div donde se pondra el editor de texto
    divpjson.setAttribute('id','edi_json');
    var tapjson=document.createElement("textarea");//Es el textarea para la salida
    tapjson.setAttribute('id','ta_json');
    tapjson.setAttribute('name','ta_json');
    tapjson.setAttribute('class','ta');
    tapjson.setAttribute('style','display:none');
    tapjson.cols=123;
    tapjson.rows=30;
    divpjson.appendChild(tapjson);
    contenidojson.appendChild(divpjson);

    var actjson=document.getElementById('edi_json');
    var tactjson=document.getElementById('ta_json');
    var editorjson=CodeMirror(actjson, {
        lineNumbers: true,
        value: tactjson.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "eclipse",
        mode: "text/x-csharp"
    }).on('change', editorjson => {
        tactjson.value=editorjson.getValue();
    });
    /*--------------------------------------------------------- */
    /*--------------------------------------------------------- */
    
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

    var nombre="Archivo"+formato+".py";//nombre del archivo
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
