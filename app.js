// Includes
var restify = require('restify');

// Config

var port 	= process.env.PORT || 8080;
var message = "Hello!";

// Serve
var server = restify.createServer();

server.get('/', function(req, res, next) {
	res.json('{"message": "Hello!"}'); 
});

server.listen(port, function () {
	console.log('%s listening at %s', server.name, server.url);
});


