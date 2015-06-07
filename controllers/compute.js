// node-rest-tsp 0.0.1
// Exposing rust-tsp via nodejs rest API
// Repo: https://github.com/JoaoHenriquePereira/node-rest-tsp

//
// Compute Controller
//

var _						= require('underscore');
	Enum					= require('enum');
	hal 					= require('hal');
	JaySchema 				= require('jayschema');
	pjson 					= require('../package.json');
	js 						= new JaySchema();
	acceptable_graph_types 	= new Enum(['u2d-cartesian']);				//For now all we'll have is this one
	error_types 			= new Enum({'request-not-json-format-error': 'FE1',
										'request-data-validation-error': 'FE2'});	

var Response;

function get_error_code(error){
	return error_types.get(error).value;
}

// TODO Needing a response builder
function build_response(code, message, description) {

	Response = new hal.Resource({
		code: code,
		message: message,
		description: description
	}, '/'+pjson.name+'/compute');

}

function add_link_to_response(rel, href) {
	Response.link(rel, href);
}

function is_JSON(req){
	try {
    	JSON.parse(req);
	} catch (e) {
    	return false;
	}
	return true;
}

function filter_post_input(req_body) {

	var expected_json_schema = require('../schemas/compute-api-schema-input.json');

	// Check if JSON input
	if(!is_JSON(req_body)){
		build_response(get_error_code('request-not-json-format-error'), 
						'request-not-json-format-error', 
						'Please input your request as JSON');
		return false;
	}

	var json_input = JSON.parse(req_body);

	// Validate the schema
	js.validate(json_input, expected_json_schema, function(errs) {
    	if (errs) { 
    		build_response(get_error_code('request-data-validation-error'), 
						'request-data-validation-error', 
						'Your input data is not acceptable');
    		return false;
    	} else { 
    		return true;
    	}
	});
	
}

module.exports.setup = function (server) {
	
	// Compute POST handler 
	function compute_post(req, res, next) {

		var json_request = JSON.stringify(req.body);

		if(filter_post_input(json_request)){
			res.send(200, Response);
		} else {
			res.send(400, Response);
		}

		return next();
	}

	// Wiring
	var API_PATH = '/'+pjson.name;
	server.post({path: API_PATH+'/compute', version: '0.0.1'}, compute_post);
}