module.exports = function (server) {

	var _ 		= require('underscore');
	var pjson 	= require('./package.json');

	//-------------------------------
	function root_get(req, res, next) {
		res.json('{"message": "Hello!"}');
	}

	function api_root_get(req, res, next) {
		var expected_json = {
			"name": pjson.name,
			"version": pjson.version,
			"repository": pjson.repository,
			"cacheable": false,
			"links": [{
				"rel": "self",
				"href": '/'+pjson.name+
			}, {
				"rel": "compute",
				"href": '/'+pjson.name+'/compute'
			}]
		}
		res.send(expected_json);
		return next();
	}

	var API_PATH = '/'+pjson.name;
   	server.get('/', root_get);
   	server.get({path: API_PATH, version: '0.0.1'}, api_root_get);
}