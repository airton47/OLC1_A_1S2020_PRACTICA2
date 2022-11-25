//ERROR STATIC NO PERTENECE AL LENGUAJE
//CONSOLE.WRITE ES LA FORMA CORRECTA DE IMPRIMIR EN ESTE ARCHIVO VIENE --- > CONSOLE.WRITELINE
// EL ESTUDIANTE DEBE QUITAR EL MAIN PARA LA CALIFICACION
//FLOAT NO DEBE RECONOCERSE --- > DOUBLE ES LA FORMA EN COMO ESTA EL ENUNCIADO


    void main()
    {
        /*
        #################### Archivo de entrada #2 #################
        ## El objetivo de este archivo es evaluar el manejo   ######
        ## correcto de ciclos.                  ######
        ## Los ciclos aceptados son:                           ######
        ####### While
        ####### For
        ####### Ademas se prueba si funciona el switch-case
        */
        Console.WriteLine(">>>>>>>>>>>>>>>> FOR <<<<<<<<<<<<<<<<<<<<");
        //---------------------- FOR -------------------------------

        String cadenaFor2 = "";
        int f;
        for(int f=1;f<7;f++)
        {
            cadenaFor2 =cadenaFor2 + "-"+ f ;
            if(f==7){
                cadenaFor2 = cadenaFor2+";";
            }
        }
        
    }
