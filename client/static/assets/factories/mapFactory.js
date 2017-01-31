myApp.factory('mapFactory', ['$http', function ($http) {

	factory = {};

	factory.getMarkers = function(callback){
		$http.get('/markers').then(function(output){
			callback(output);
		})
	}

	return factory;

}]);