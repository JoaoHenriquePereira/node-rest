var expect 		= require('chai').expect,
	supertest 	= require('supertest'),
	api 		= supertest('http://localhost:8080');

describe('app', function() {
	
	it('Root should return \"Hello!\"', function(done) {
		api.get('/')
		.set('Accept', 'application/json')
		.expect(200)
		.end( function(err, res) {
			if (err) return done(err);
			expect(res.body).to.equal('"message": "Hello!"');
			done();
		});
  	});
});