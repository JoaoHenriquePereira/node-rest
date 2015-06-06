module.exports = function (server) {

	var pjson = require('./package.json');

	//-------------------------------
	function root_get(req, res, next) {
		res.json('{"message": "Hello!"}');
	}

	function api_root_get(req, res, next) {
		var expected_json = {
			"name": pjson.name,
			"version": pjson.version,
			"repository": "https://github.com/JoaoHenriquePereira/node-rest-tsp",
			"cacheable": false,
			"links": [{
				"rel": "self",
				"href": '/'+pjson.name+'/v'+pjson.version
			}, {
				"rel": "compute",
				"href": '/'+pjson.name+'/v'+pjson.version+'/compute'
			}]
		}
		res.send(expected_json);
		return next();
	}

	var API_PATH = '/'+pjson.name;
   	server.get('/', root_get);
   	server.get({path: API_PATH, version: '0.0.1'}, api_root_get);
}