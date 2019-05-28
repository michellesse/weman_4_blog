



/** Este archivo se usará para poner funciones de ejemplo para llamadas asíncronas
 * Aunque no vienen pensadas en ejercicio original, es bueno pensarlas de una vez.
 */



function peticionAsync(tipo, url, parametros) {
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
    if (ajax.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4 
      //este se activa cuando cambia el estado (se maneja asi apra cambiar el model de capas)
      //
			if (ajax.status == 200) {
				//El resultado es exitoso!
        //Tomar las acciones necesarias aquí
        let resp= JSON.parse(ajax.response);
        if(resp.error=="0") {
          if(url=== '/comentarios') {
            dibujaComentarios(resp.registros);
          } else if (url==='/login') {
            alert("Bienvenido: " + resp.nombre);
          }
          //A partir de aqui nos preparamos para otras peticiones
          //y manejar segun el caso.
          //Dado que tenemos la convencion de que la propiedad "error" es omnipesente
          //en todas las peticiones, podemos saber (sin importar la petición)que fue exitosa
          //Ed de recordarse que es una CONVENCIÓN de trbajo, no una regla de lenguaje
        } else if(resp.error == "1") {
          alert("Error de credenciales");
        }
			} else if (ajax.status == 404) {
				//No encontró el servicio o API
			} else {
				//Una respuesta inesperada por parte del servidor
				alert('Saliendo precipitadamente de la aldea por culpa de la escaces de rinocerontes');
			}
		}
	};
	//El tipo puede ser GET, POST, PUT, DELETE o cualquier tipo aceptado por HTTP
	//La URL es a dondo hará la petición...
	//Por último, el "true" indica que es una petición asíncrona
	ajax.open(tipo, url, true);
	//Se establece cómo será enviado el contenido.
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	//La función encodeURI se encarga que la petición tenga el formato adecuado para ser enviado...
	//un ejemplo de petición puede ser variable=valor&otravariable=otrovalor...
  if(parametros.toString() === "[object FormData]")
  ajax.send(parametros);
  else
  ajax.send(encodeURI(parametros));
}

// function validarCorreo() {
//   let valCorreo = document.getElementById('correoelectronico');
//   let regez = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z\-])+\.)+([a-zA-Z]{2,4})+$/;
//   //console.log(valCorreo);
//   if (regez.test(valCorreo.value)){
//    alert("La dirección de email " + valCorreo.value + " es válida!.")
//    // return: true;
//    } else {
//     alert("La dirección de email es super inválida!.");
//    }
//   }

function validarContraseña() {
  let valContras = document.getElementById('contras');
  let regez = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z\-])+\.)+([a-zA-Z]{2,4})+$/;
  //console.log(valCorreo);
  if (regez.test(valContras.value)){
   alert("La contraseña es " + valContras.value + " es válida!.")
   // return: true;
   } else {
    alert("La contraseña es super inválida!.");
   }
  }

function leerComentarios() {
  peticionAsync('GET', '/comentarios', '');
  alert ("Alerta");
}

function doPrueba(){
  var formulario = document.getElementById('frmLogin');
  peticionAsync('POST', '/login', 'usr=' + formulario.usr.value + '&pwd=' + formulario.pwd.value);
}

/*     <body onload="inicia()">
            <div id="cont_comentarios" >
                <div class="comentarios" >
                    <h2 class="tituloFancy">Esto es una noticia</h2>
                    <p class="fecha">15:38 - 23 de Mayo de 2019</p>
                    <p class="comentarioFancy" >No lo lograremos y ese es mi comentario No lo lograremos y ese es mi comentario 
                        No lo lograremos y ese es mi comentario No lo lograremos y ese es mi comentario No lo lograremos y ese es mi
                         comentario No lo lograremos y ese es mi comentario No lo lograremos y ese es mi comentario No lo lograremos y 
                         ese es mi comentario No lo lograremos y ese es mi comentario No lo lograremos y ese es mi comentario No lo 
                         lograremos y ese es mi comentario No lo lograremos y ese es mi comentario No lo lograremos y ese es mi comentario
                         </p>
                    <p class="autorFancy" >Brenda Michelle</p>
                </div>
                <div class="imagenFancy">
                    <img src="./Gato_Guapo2.jpeg" alt="Gatita carey juzgadote" height="200px" />   
                </div>
            </div>
                <!-- <div class="imagenFancy"   >
                        <img class= "imagenes" src="./Gato_Guapo2.jpeg" alt="Gatita carey juzgadote " width="30%"/>
                </div> -->
    </body> 
 */

function dibujaComentarios(coments) {
  let contenedor = document.getElementById('superComentarios');
  for (let i=0; i< coments.length; i++) {
    let nuevoComent = '<div id="com'+coments[i].id+'">\
    <div class="comentarios" >\
    <h2 class="tituloFancy">'+coments[i].titulo+'</h2>\
    <p class="fecha">'+coments[i].momento+'</p>\
    <p class="comentarioFancy" >'+coments[i].contenido+'</p>\
    <p class="autorFancy" >'+coments[i].idusuario+'</p>\
    </div> </div>';
    contenedor.innerHTML += nuevoComent;
  }
  
}



function btnComentario() {
  // Get the modal
  var modalC = document.getElementById("myModalC");
          
  // Get the button that opens the modal
  var btnC = document.getElementById("btnComment");
  
  // Get the <span> element that closes the modal
  var spanC = document.getElementsByClassName("closeC")[0];
  
  // When the user clicks the button, open the modal 
  btnC.onclick = function() {
    modalC.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  spanC.onclick = function() {
    modalC.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modalC) {
      modalC.style.display = "none";
    }
  }
}

function btnUsuario() {
  // Get the modal
   var modalU = document.getElementById("myModalU");
           
   // Get the button that opens the modal
   var btnU = document.getElementById("btnUser");
   
   // Get the <span> element that closes the modal
   var spanU = document.getElementsByClassName("closeU")[0];
   
   // When the user clicks the button, open the modal 
   btnU.onclick = function() {
     modalU.style.display = "block";
   }
   
   // When the user clicks on <span> (x), close the modal
   spanU.onclick = function() {
     modalU.style.display = "none";
   }
   
   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
     if (event.target == modalU) {
       modalU.style.display = "none";
     }
   }
 }


 