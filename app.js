// node-rest-tsp 0.0.1
// Exposing rust-tsp via nodejs rest API
// Repo: https://github.com/JoaoHenriquePereira/node-rest-tsp

//
// App server definition
//

// Includes
var fs 		= require('fs');
	restify = require('restify');
	
// Config
var port 	= process.env.PORT || 8080;

// Serve
var server = restify.createServer({'name': 'node-rest-tsp'});

server.use(restify.fullResponse()); // Set up default headers
server.use(restify.bodyParser()); 	// Remap the body content of a request

// Add the routing controllers

var controllerFiles = fs.readdirSync('controllers');

controllerFiles.forEach(function (controllerFile) { 
if (controllerFile.indexOf('.js') === -1) {                      
	return;                                                           
} else {                                                      
	controllerFile = controllerFile.replace('.js', '');             
	var controller = require('./controllers/' + controllerFile); 
	controller.setup(server);                                                 }
});

// Start listening
server.listen(port, function () {
	console.log('%s listening at %s', server.name, server.url);
});


