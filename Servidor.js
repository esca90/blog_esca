//importa Librerias
var express = require("express");
var nunjucks = require("nunjucks");

//Creando el servidor web
var app = express();

//configuarcionde express
//primer argumento es un nombre logico
//segundo argumento es la carpeta real
//static permite access, pero debo de conocer la ruta completa del archivo
app.use("/css",express.static(__dirname + "/css"));
//con directory nos permite navegar en esa carpeta(ver archivos!!) //
app.use("/css",express.directory(__dirname + "/css"));
app.use("/imagenes",express.static(__dirname + "/imagenes"));
app.use("/videos",express.static(__dirname + "/videos"));
app.use("/javascript",express.static(__dirname + "/javascript"));

//HABILITA RECIBIR PARAMETROS POST
app.use(express.urlencoded());

nunjucks.configure(__dirname+"/vistas",{    //es la ruta donde esta la ruta
	
	express:app
});



//levantando el servidor en el puerto 800
app.listen(8000);
app.get("/",function(request, response){
	
	/*response.send("estas ahi"); */
	response.render("index.html",{
		configuracion:{
		saludo:"Desarrollo Agil como un gato dimanico"  //desplegar contenido dimanico
	}
	});
	
});

app.get("/contacto", function(request, response){
	
	response.render("contacto.html");
	
});

    app.get("/blog", function(request, response){
    	
    	var postEncontrados = [{
    		titulo:"post1",
    		descripcion:"descripcion del post 1(breve)"
    	},{
    		titulo:"post2",
    		descripcion:"descripcion del post 2(breve)"
    	}];
    	
    	//simulamos que la base no tiene articulos
    	postEncontrados = [];
    	
    	response.render("blog.html",{
    	posts:postEncontrados
    	});
    	
    } );  

app.post("/suscribir",function(request, response){
	
	
	//request=Tiene todo lo que envia el usuario
	//response=ES LO QUE PINTAMOS AL USUARIO
	//body tiene todos los parametros del formulario
	//que se envian por un http-post
	console.log("email del usuario"+request.body.email);
	//revisar el parametros
	response.send("email del usuario:"+request.body.email);
});

app.post("/contactar",function(request, response){
	
	
	//request=Tiene todo lo que envia el usuario
	//response=ES LO QUE PINTAMOS AL USUARIO
	//body tiene todos los parametros del formulario
	//que se envian por un http-post
	console.log("Nombre del usuario"+request.body.nombre);
	console.log("Email del usuario"+request.body.email);
	console.log("website del usuario"+request.body.url);
	console.log("edad del usuario"+request.body.edad);
	console.log("Comentario del usuario"+request.body.comentario);
	
	//revisar el parametros
	response.send("Nombre del usuario:"+request.body.nombre + ",email del usuario:"+request.body.email+",website del usuario:"+request.body.url+",edad del usuario:"+request.body.edad+",Comentario del usuario:"+request.body.comentario);
});




console.log("arrancando servidor");


