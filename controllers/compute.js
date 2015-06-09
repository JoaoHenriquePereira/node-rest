// node-rest-tsp 0.0.1
// Exposing rust-tsp via nodejs rest API
// Repo: https://github.com/JoaoHenriquePereira/node-rest-tsp

//
// Compute Controller
//

var Enum					= require('enum');
	hal 					= require('hal');
	pjson 					= require('../package.json');
	chai 					= require('chai');
	ResponseBuilder			= require('../response');
	acceptable_graph_types 	= new Enum(['u2d-cartesian']);				//For now all we'll have is this one

chai.use(require('chai-json-schema'));
var Response = null;

function filter_post_input(req_body) {

	var expected_input_schema = require('../schemas/compute-api-schema-input.json');

	var validation_result = chai.tv4.validateMultiple(req_body, expected_input_schema);

	if(!validation_result.valid) {
		Response = new ResponseBuilder.ErrorResponse('/'+pjson.name+'/compute')
												.build(validation_result.errors)
												.finish();
		return false;
	}

	return true;
}

module.exports.setup = function (server) {
	
	// Compute POST handler 
	function compute_post(req, res, next) {

		if(filter_post_input(req.body)){
			// Process request and generate result

			//...
			Response = new ResponseBuilder.ComputeResponse('/'+pjson.name+'/compute')
												.finish();


			res.send(200, Response);
		} else {
			console.log(Response);
			res.send(Response.code, Response);
		}

		return next();
	}

	// Wiring
	var API_PATH = '/'+pjson.name;
	server.post({path: API_PATH+'/compute', version: '0.0.1'}, compute_post);
}