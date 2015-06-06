module.exports = function (server) {

	//-------------------------------
	function root_get(req, res, next) {
		res.json('{"message": "Hello!"}');
	}

   	server.get('/', root_get);
}