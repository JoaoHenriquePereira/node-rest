var crypto 			= require('crypto');
	NodeCache		= require('node-cache');
	
/**
 * Represents the ComputeModel for managing results and accessing rust-tsp,
 * In fact it's a cache manager and rust-tsp DAO
 * @param {number}  stdTTL     		the std time-to-life in seconds.
 * @param {number}  checkperiod     the .
 */

var cache;

var ComputeModel = (function () {
  	function ComputeModel(stdTTL, checkperiod) {
  		cache = new NodeCache( { stdTTL: stdTTL, checkperiod: checkperiod } );
  	}

	ComputeModel.prototype.set = function (key, val, ttl) {
		return cache.set( key, val, ttl);
	}  	

	ComputeModel.prototype.get = function (key) {
		return cache.get( key );
	}

	ComputeModel.prototype.compute = function (json_input_data) {
		// Call rust-tsp

		//TODO
		var result = "";

		// Generate random key
		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		
		var id = crypto.createHash('sha1').update(current_date + random).digest('hex');

		this.set(id, result);

		return id;
	}  	

  	return ComputeModel;
})();

module.exports = ComputeModel;