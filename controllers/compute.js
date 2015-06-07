// node-rest-tsp 0.0.1
// Exposing rust-tsp via nodejs rest API
// Repo: https://github.com/JoaoHenriquePereira/node-rest-tsp

//
// Compute Controller
//

module.exports.setup = function (server) {

	var _		= require('underscore');
		hal 	= require('hal');
		pjson 	= require('../package.json');


	// Wiring
	var API_PATH = '/'+pjson.name+'/';
}