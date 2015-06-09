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

	// Check schema for incoherences
	if(!validation_result.valid) {
		Response = new ResponseBuilder.ErrorResponse('/'+pjson.name+'/compute')
												.build(validation_result.errors)
												.finish();
		return false;
	}

	// Check input graph type
	if(!acceptable_graph_types.get(req_body.graph_type)){
		Response = new ResponseBuilder.ErrorResponse('/'+pjson.name+'/compute')
												.build([{ 
    													message: 'Invalid graph_type, acceptable types: '+acceptable_graph_types.toString(),
    													dataPath: '/graph_type'}])
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
			res.send(Response.code, Response);
		}

		return next();
	}

	// Wiring
	var API_PATH = '/'+pjson.name;
	server.post({path: API_PATH+'/compute', version: '0.0.1'}, compute_post);
}