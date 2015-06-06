var chai 		= require('chai');
	expect 		= require('chai').expect,
	supertest 	= require('supertest'),
	api 		= supertest('http://localhost:8080');
	pjson 		= require('../package.json');

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
  		
  		var expected_json = {
			"name": pjson.name,
			"version": pjson.version,
			"repository": "https://github.com/JoaoHenriquePereira/node-rest-tsp",
			"cacheable": false,
			"links": [{
				"rel": "self",
				"href": '/'+pjson.name+'/'
			}, {
				"rel": "compute",
				"href": '/'+pjson.name+'/compute'
			}]
		}

		api.get('/'+pjson.name)
		.set('Accept', 'application/json')
		.expect(200)
		.end( function(err, res) {
			if (err) return done(err);
			expect(res.body).to.be.jsonSchema(expected_json);
		});

		api.get('/'+pjson.name)
		.set('Accept', 'application/json')
		.set('Accept-Version', '0.0.1')
		.expect(200)
		.end( function(err, res) {
			if (err) return done(err);
			expect(res.body).to.be.jsonSchema(expected_json);
		});

		api.get('/'+pjson.name)
		.set('Accept', 'application/json')
		.set('Accept-Version', '0.0.2')
		.expect(400)//Should be 501?
		.end( function(err, res) {
			if (err) return done(err);
			expect(res.body).to.be.jsonSchema(expected_json);
			done();
		});
  	});



});