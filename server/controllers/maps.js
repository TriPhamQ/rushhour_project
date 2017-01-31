var api_key = 'AIzaSyCipGKNRqwoj-UbQ3eJbYy5rCHeRE2vjNE';
var bass_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='

var googleMapsClient = require('@google/maps').createClient({
	key: api_key
});

module.exports = (function(){
	return {
		validateAddress:function(req, res){
			googleMapsClient.geocode({
				address: req.body.address
			}, function(error, response){
				if (!error){
					res.json(response.json.results);
				}
			})
		}
	}
})();