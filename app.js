// Includes
var restify = require('restify');

// Config
var port 	= process.env.PORT || 8080;

// Serve
var server = restify.createServer({'name': 'node-rest-tsp'});

server.use(restify.fullResponse()); // Set up default headers
server.use(restify.bodyParser()); 	// Remap the body content of a request

// require the routes
require('./routes')(server);

server.listen(port, function () {
	console.log('%s listening at %s', server.name, server.url);
});


