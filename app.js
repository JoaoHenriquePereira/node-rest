// Includes

var express 		= require('express');	//call express
	app 			= express();
	bodyParser 		= require('body-parser')
	expressMongoose = require('express-mongoose');

// Config

var port 	= process.env.PORT || 8080;
var router 	= express.Router();

app.set('port', port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('api', __dirname + '/api');

var message = "Hello!";


app.route('/').get(function(req, res,next) {
	res.json('{"message": "Hello!"}'); 
});

// Serve

app.listen(app.get('port'), function() {
	console.log("Listening on " + port);
});



