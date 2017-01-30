myApp.factory('usersFactory', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
	console.log('Users Factory');
	var factory = {};

	factory.register = function (input, callback) {
		console.log("In the reg user factory");
		console.log(input);
		$http.post('/reg', input).then(function (output) {
			// console.log("Successfully registered!");
			callback(output);
		});
	};

	factory.login = function (input, callback) {
		$http.post('/log', input).then(function (output) {
			// console.log("Successfully logged in!");
			console.log("Log Factory output", output.data);
			$cookies.put('token', output.data.token);
			$cookies.put('currentuser', output.data.user);
			$cookies.put('currentuser_id', output.data._id);
			$rootScope.token = output.data.token;
			$rootScope.currentuser = output.data.user;
			$rootScope.currentuser_id = output.data._id;
			callback(output);
		});
	};
	return factory;
}]);
