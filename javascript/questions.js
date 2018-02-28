var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
var respuestasCheckbox = [];
//
var numeroSecreto2=null;
var respuestaSelect2=null;
var respuestasCheckbox2 = [];
//Anyadido
var respuestaRadio = null;
var textoSecreto=null;
var respuestaRadio2 = null;
var textoSecreto2=null;

//
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

	//CORREGIR al apretar el botón
	formElement=document.getElementById('myform');
	formElement.onsubmit=function(){
		inicializar();
		if (comprobar()){

			corregirNumber(numeroSecreto, "num");
			corregirSelect(respuestaSelect,1);
			corregirCheckbox(respuestasCheckbox, "color");
			corregirRadio(respuestaRadio, "rad");
			corregirText(textoSecreto, "text");
			corregirNumber(numeroSecreto2, "num2");
			corregirSelect(respuestaSelect2,12);
			corregirCheckbox(respuestasCheckbox2, "color2");
			corregirRadio(respuestaRadio2, "rad2");
			corregirText(textoSecreto2, "text2");
			presentarNota();
		
		}
		return false;
	}
 
	//LEER XML de xml/preguntas.xml
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gestionarXml(this);
		}
	};
	xhttp.open("GET", "xml/preguntas.xml", true);
	xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){

	var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc


	//NUMBER
	//Recuperamos el título y la respuesta correcta de Input
	function leerInput(seccion, titulo) {

		var tituloInput=xmlDoc.getElementsByTagName("title")[seccion].innerHTML;
		ponerDatosInputHtml(tituloInput, titulo);
	}

	//SELECT
	//Recuperamos el título y las opciones
	function leerSelect(seccion, seccion2, titulo, opciones) {

		var tituloSelect=xmlDoc.getElementsByTagName("title")[seccion].innerHTML;
		var opcionesSelect = [];
		var nopt = xmlDoc.getElementById(seccion2).getElementsByTagName('option').length;
	
		for (i = 0; i < nopt; i++) { 
			opcionesSelect[i] = xmlDoc.getElementById(seccion2).getElementsByTagName('option')[i].innerHTML;
		}
		ponerDatosSelectHtml(tituloSelect,opcionesSelect,titulo, opciones);
	}

	//CHECKBOX y RADIO
	//Recuperamos el título y las opciones
	//tipo 0 es checkbox y tipo 1 radio
	function leerCheck(seccion, seccion2, tipo, titulo, opciones, nombre) {
		var tituloCheck = xmlDoc.getElementsByTagName("title")[seccion].innerHTML;
 		var opcionesCheck = [];
 		var nopt = xmlDoc.getElementById(seccion2).getElementsByTagName('option').length;
		for (i = 0; i < nopt; i++) { 
   			opcionesCheck[i]=xmlDoc.getElementById(seccion2).getElementsByTagName('option')[i].innerHTML;

		}
		if (tipo == 0)  {

			ponerDatosCheckboxHtml(tituloCheck,opcionesCheck,titulo, opciones, nombre);
		}
		if (tipo == 1) {
			ponerDatosRadioHtml(tituloCheck,opcionesCheck, titulo, opciones, nombre);

		}
	}

	leerInput(0,"tituloInput");
	leerSelect(1,"profe_002","tituloSelect",0);
	leerCheck(2, "profe_003",0,"tituloCheckbox", "checkboxDiv", "color");
	leerCheck(3,"profe_004",1,"tituloRadio", "radioDiv", "rad");
	leerInput(4,"tituloInputText");
	leerInput(5,"tituloInput2");
	leerSelect(6,"profe_007","tituloSelect2",1);
	leerCheck(7, "profe_008",0,"tituloCheckbox2", "checkboxDiv2", "color2");
	leerCheck(8,"profe_009",1,"tituloRadio2", "radioDiv2", "rad2");
	leerInput(9,"tituloInputText2");

	//Respuestas
	numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
	respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
	for (i = 2; i < 5; i++) { 
		respuestasCheckbox[i]=parseInt(xmlDoc.getElementsByTagName("answer")[i].innerHTML);
	}	
	respuestaRadio= parseInt(xmlDoc.getElementsByTagName("answer")[5].innerHTML);
	textoSecreto=xmlDoc.getElementsByTagName("answer")[6].innerHTML;
	numeroSecreto2=parseInt(xmlDoc.getElementsByTagName("answer")[7].innerHTML);
	respuestaSelect2=parseInt(xmlDoc.getElementsByTagName("answer")[8].innerHTML);
	for (i = 9; i < 12; i++) { 
		respuestasCheckbox2[i]=parseInt(xmlDoc.getElementsByTagName("answer")[i].innerHTML);
	}
	respuestaRadio2= parseInt(xmlDoc.getElementsByTagName("answer")[12].innerHTML);
	textoSecreto2=xmlDoc.getElementsByTagName("answer")[13].innerHTML;


}
//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t,titulo){
	document.getElementById(titulo).innerHTML = t;
}

function ponerDatosSelectHtml(t,opt,titulo, opciones){
	document.getElementById(titulo).innerHTML=t;
	var select = document.getElementsByTagName("select")[opciones];
	for (i = 0; i < opt.length; i++) { 
		var option = document.createElement("option");
		option.text = opt[i];
		option.value=i+1;
		select.options.add(option);
	}  
}

function ponerDatosCheckboxHtml(t,opt, titulo, opciones, nombre){
	var checkboxContainer=document.getElementById(opciones);
	document.getElementById(titulo).innerHTML = t;
	for (i = 0; i < opt.length; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opt[i];
		label.setAttribute("for", nombre+"_"+i);
		input.type="checkbox";
		input.name=nombre;
		input.id=nombre+"_"+i;;    
		checkboxContainer.appendChild(input);
		checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(document.createElement("br"));
	} 
}

function ponerDatosRadioHtml(t,opt, titulo, opciones, nombre){
		var radioContainer=document.getElementById(opciones);
		document.getElementById(titulo).innerHTML = t;
		for (i = 0; i < opt.length; i++) { 
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			label.setAttribute("for", nombre+"_"+i);
    			input.type="radio";
    			input.name=nombre;
    			input.id=nombre+"_"+i;;    
    			radioContainer.appendChild(input);
    			radioContainer.appendChild(label);
    			radioContainer.appendChild(document.createElement("br"));
 		} 
} 



//****************************************************************************************************
//implementación de la corrección

function corregirNumber(numero, pregunta){
	var p;
	var ok = 0;
	if (pregunta == "num") {
		p=1;
	}
	if (pregunta == "num2") {
		p=6;
	}

	var s=document.getElementById(pregunta).value
	if (s==numero) {
		ok=  1;
		darRespuestaHtml("P"+p+": Exacto! + 1 Punto",p ,ok);
		nota +=1;
  	} else {
		nota -=0.25;
    		if (s>numero) {
			darRespuestaHtml("P"+p+": Te has pasado -0,25 Puntos",p ,ok);

		} else {
			darRespuestaHtml("P"+p+": Te has quedado corto -0,25 Puntos",p ,ok);
		}  	
	}
}
function corregirText(texto, pregunta){
	var p;
	var ok = 0;
	if (pregunta == "text") {
		p=5;
	}
	if (pregunta == "text2") {
		p=10;
	}

	var s=document.getElementById(pregunta).value
	if (s.toUpperCase()==texto) {
		ok = 1;
		darRespuestaHtml("P"+p+":  ¡Correcto! +1 Punto",p ,ok);
		nota +=1;
	} else {
    		darRespuestaHtml("P"+p+": Incorrecto -0,25 Puntos",p ,ok);
		nota -=0.25;
  	}

}
function corregirSelect(respuesta, pregunta){

	var p;
	var ok = 0;
	if (pregunta == 1) {
		p=2;
	}
	if (pregunta == 12) {
		p=7;
	}

	var sel = formElement.elements[pregunta];  
	if (sel.selectedIndex-1==respuesta) { 
		ok = 1;
		darRespuestaHtml("P"+p+": Correcto +1 Punto",p ,ok);
		nota +=1;
	} else {
		darRespuestaHtml("P"+p+": Incorrecto -0,25 Puntos",p ,ok);
		nota -=0.25;
	}
}
function corregirRadio(respuesta, nombre){
	var p;
	var ok = 0;
	var f=formElement;
	var escorrecta = null;
	if (nombre == "rad") {
		p=4;
		if (f.rad[respuesta].checked == true) {
			nota +=1.0;
			ok = 1;
			darRespuestaHtml("P4: la "+(respuesta+1)+"º es Correcta +1 Punto",p ,ok);
		} else {		
			nota -=0.25;
			darRespuestaHtml("P4: Incorrecta -0,25 Puntos",p ,ok);
		}
	}
	if (nombre == "rad2") {
		p=9;
		if (f.rad2[respuesta].checked == true) {
			nota +=1.0;
//			alert(respuesta);
			ok = 1;
			darRespuestaHtml("P9: la "+(respuesta+1)+"º es Correcta +1 Punto",p ,ok); 
		} else {		
			nota -=0.25;
			darRespuestaHtml("P9: Incorrecta -0,25 Puntos",p ,ok);
		}
	}

}
//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox(respuestasCheckbox, nombre){
	//Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
	var p;
	var f=formElement;
	var escorrecta = [];
	if (nombre == "color") {
		p=3;
		for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
			if (f.color[i].checked) {
				escorrecta[i]=false;     
				for (j = 0; j < respuestasCheckbox.length; j++) {
					if (i==respuestasCheckbox[j]) {
						escorrecta[i]=true;
					}
				}
				//si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
				if (escorrecta[i]) {
					nota +=0.33;     				
					ok = 1;
					darRespuestaHtml("P3: la "+(i+1)+"º es Correcta +0,33 Puntos",p ,ok);  
				} else {
					nota -=0.25;  
					ok = 0;
					darRespuestaHtml("P3: la "+(i+1)+"º es Incorrecta -0.25 Puntos",p ,ok);
				}   
			} 
		}
	}

	if (nombre == "color2") {
		p=8;
		for (i = 0; i < f.color2.length; i++) {  //"color" es el nombre asignado a todos los checkbox
			if (f.color2[i].checked) {
				escorrecta[i]=false;     
				for (j = 0; j < respuestasCheckbox.length; j++) {
					if (i==respuestasCheckbox[j]) {
						escorrecta[i]=true;
					}
				}
				
				if (escorrecta[i]) {
					nota += 0.33   
					ok = 1;
					darRespuestaHtml("P8: la "+(i+1)+"º es Correcta + 0,33 Puntos",p ,ok);    
				} else {
					nota -=0.25;     
					ok = 0;
					darRespuestaHtml("P8: la "+(i+1)+"º es Incorrecta -0,25 Puntos",p ,ok);
				}   
			} 
		}
	}


}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r, p, ok){
	var correccion = document.getElementById('solucion'+p);
	var div_ok = document.createElement("div");
	div_ok.className = "correcta";

	var div_fail = document.createElement("div");
	div_fail.className = "incorrecta";


	//uso los metodos .appendChild y createTextNode porque en el checkbox hay muchas posibles respuestas
	// y quiero que me ponga el texto en verde o en rojo segun si acierto o no 
	if (ok == 1) {
	
		div_ok.appendChild(document.createTextNode(r));
		document.getElementById('solucion'+p).appendChild(div_ok);
	}
	if (ok ==0 ) {

		div_fail.appendChild(document.createTextNode(r));
		document.getElementById('solucion'+p).appendChild(div_fail);
	}

}


function presentarNota(){

	var resultado_nota = null;
	//Redondeamos a 10 si todas las respuestas son correctas
	if (nota == 9.98) {
		nota = 10;
	}
	if (nota < 5) {
		resultado_nota = "<div class='incorrecta'>Nota: "+nota.toFixed(2)+" puntos sobre 10 <br> SUSPENDIDO</div>";	
	} else {
		resultado_nota = "<div class='correcta'>Nota: "+nota.toFixed(2)+" puntos sobre 10<br> APROBADO</div>";	
	}
	document.getElementById('resultadosDiv').innerHTML = resultado_nota ;
}

function inicializar(){

	nota=0.0;
	//si hubiera correcciones nos aseguramos de borrarlas
	for (i = 1; i < 11; i++) {
		
		document.getElementById('solucion'+i).innerHTML = "";

	}
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){

	var check_checkbox=false;
	var check_checkbox2=false;
	var check_radio=false;
	var check_radio2=false;

	for (i = 0; i < 4 ; i++) {  //"color" es el nombre asignado a todos los checkbox
		if (document.getElementById("color_"+i).checked == true) {
			check_checkbox=true;
		}	
	}
	for (i = 0; i < 4 ; i++) {  //"rad" es el nombre asignado a todos los radio
		if (document.getElementById("rad_"+i).checked == true) {
			check_radio=true;
		}	
	}
	for (i = 0; i < 4 ; i++) {  
		if (document.getElementById("color2_"+i).checked == true) {
			check_checkbox2=true;
		}	
	}
	for (i = 0; i < 4 ; i++) {  
		if (document.getElementById("rad2_"+i).checked == true) {
			check_radio2=true;
		}	
	}

	function comprobar_input(nombre_input) {
		var valor
		var n_pregunta;
		if (document.getElementById(nombre_input).value =="") { 
			
			if (nombre_input=="num") {
				valor= "número";
				n_pregunta = 1;
			}
			if (nombre_input=="text") {
				valor= "texto";
				n_pregunta = 5;
			}
			if (nombre_input=="num2") {
				valor= "número";
				n_pregunta = 6;
			}

			if (nombre_input=="text2") {
				valor= "texto";
				n_pregunta = 10;
			}
			alert("Escribe un "+valor+" en la pregunta "+n_pregunta);
			document.getElementById(nombre_input).focus();
			return false;
		}
	}
 	if (comprobar_input("num") == false || comprobar_input("text") == false || comprobar_input("num2") == false || comprobar_input("text2") == false  ) {
		
		return false;
	}
	else if (document.getElementById("sel").selectedIndex==0) {
 		
		alert("Selecciona una opción de la pregunta 2"); 
		document.getElementById("sel").focus();     
	}
	else if (document.getElementById("sel2").selectedIndex==0) {

 		alert("Selecciona una opción de la pregunta 7");
		document.getElementById("sel2").focus();
        
	}
	else if  ( check_checkbox == false){
		alert("Selecciona una opción de la pregunta 3");
		document.getElementById("color_0").focus();
	
	} 
	else if  ( check_radio == false){
		alert("Selecciona una opción de la pregunta 4");
		document.getElementById("rad_0").focus();
	
	}	
	else if  ( check_checkbox2 == false){
		alert("Selecciona una opción de la pregunta 8");
		document.getElementById("color2_0").focus();
	
	}
	else if  ( check_radio2 == false){
		alert("Selecciona una opción de la pregunta 9");
		document.getElementById("rad2_0").focus();
	
	} else {
		return true;
	}
}
