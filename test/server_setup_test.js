exports.serverSetupTest = function(beforeExit, assert) {
	
	server = require('./../server.js');

	//Check server root for with simple get
	assert.response(server, {
		url: '/', timeout: 500
	}, {
		body: 'foobar'
	});

};
