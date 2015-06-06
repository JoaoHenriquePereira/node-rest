var chai 		= require('chai');
	expect 		= require('chai').expect,
	supertest 	= require('supertest'),
	api 		= supertest('http://localhost:8080');

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
});