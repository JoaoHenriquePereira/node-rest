var chai 			= require('chai');
	expect 			= require('chai').expect,
	supertest 		= require('supertest'),
	api 			= supertest('http://localhost:8080');
	pjson 			= require('../package.json');

chai.use(require('chai-json-schema'));

describe('app', function() {

	it('Root should return \"Hello!\"', function(done) {

		var expected_json = {
			"message": "Hello!"
		}

		api.get('/')
		.set('Accept', 'application/json')
		.expect(200)
		.end( function(err, res) {
			if (err) return done(err);
			expect(res.body).to.be.jsonSchema(expected_json);
			done();
		});
  	});

  	it('API starting entry point should provide HATEOAS navigation', function(done) {
  		
  		var invalid_version = '9'+pjson.version;

  		var expected_json_schema = require('./test_schema/api-root-schema.json');

  		var expected_json = {
			"name": pjson.name,
			"version": pjson.version,
			"repository": pjson.repository,
			"cacheable": false,
			"links": [{
				"rel": "self",
				"href": '/'+pjson.name
			}, {
				"rel": "compute",
				"href": '/'+pjson.name+'/compute'
			}]
		}

		// No version specified
		api.get('/'+pjson.name)
		.set('Accept', 'application/json')
		.expect(200)
		.end( function(err, res) {
			if (err) return done(err);
			expect(res.body).to.be.jsonSchema(expected_json_schema);
			//Warning not a fan of comparing by stringify like this
			expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify(expected_json));
		});

		// Correct version specified
		api.get('/'+pjson.name)
		.set('Accept', 'application/json')
		.set('Accept-Version', pjson.version)
		.expect(200)
		.end( function(err, res) {
			if (err) return done(err);
			expect(res.body).to.be.jsonSchema(expected_json_schema);
			expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify(expected_json));
		});

		// Incorrect version specified
		api.get('/'+pjson.name)
		.set('Accept', 'application/json')
		.set('Accept-Version', invalid_version)
		.expect(400) // Should be 501?
		.end( function(err, res) {
			if (err) return done(err);
			done();
		});
  	});



});