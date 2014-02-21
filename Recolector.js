
var http = require('http');
var url = require('url');
var nodemailer = require("nodemailer");
	
	
var procesarRegistrar = function(request, response, urlParseada) {
	if (request.method == 'GET') {
		response.writeHead(200, { 
			'Content-Type' : 'text/html'
		});			
		response.write('<p>Instancia ' + 
					   urlParseada.query.instancia + 
					   ' registrada</p>');
	} else {
		response.writeHead(405);
	}
	response.end();
}	
	
	
	var index = 0;
	// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "dforcadell@gmail.com",
        pass: "aurmvjgsofgyefiz"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Fred Foo ✔ <dforcadell@gmail.com>", // sender address
    to: "bar@blurdybloop.com, dforcadell@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world La CPU esta sobrecargada!!!!!@@@@ ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}


	
var procesarEstadistica = function(request, response) {

	
	
	if (request.method == 'POST') {
		var datos = '';
		
		request.on('data', function(nuevosDatos) {
			datos = datos + nuevosDatos.toString();
		});
		request.on('end', function() {
			// !!!
			response.writeHead(200);
			console.log('****************************');
			console.log(datos);
			console.log('****************************');
			response.end();
			
			var DADES = JSON.parse(datos);
		if ( DADES.usoCPU60seg > 0.45 ) {	
			//index ++;
			//if (index == 2){
				console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
				console.log('La CPU esta sobrecargada');
				console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
				
				
			// send mail with defined transport object
			smtpTransport.sendMail(mailOptions);
			
			
			
			
			//	var index = 0;
			//}
		}
		});
	
	} else {
		response.writeHead(405);
		response.end();
	}
	
}




	
var procesador = function(request, response) {
	var urlParseada = url.parse(request.url, true);
	
	if (urlParseada.pathname == '/registrar') {
		procesarRegistrar(request, response, urlParseada);
	} else if (urlParseada.pathname = '/estadistica') {
		procesarEstadistica(request, response);
	} else {
		response.writeHead(404);
		response.end();
	}
}

var server = http.createServer(procesador);
server.listen(80);