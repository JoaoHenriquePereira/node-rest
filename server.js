// Route and serve

var express 	= require('express');	//call express
var app 		= express();
var bodyParser 	= require('body-parser');

// Config
// Allow the usage of POST data with json

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Routes
var router = express.Router();	

