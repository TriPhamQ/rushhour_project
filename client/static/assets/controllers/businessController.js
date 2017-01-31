myApp.controller('businessController', ['$scope', '$location', '$rootScope', '$cookies', function ($scope, $location, $rootScope, $cookies){
	
	console.log('businessController');

	$scope.logOut = function () {
        $cookies.remove('token');
        $cookies.remove('currentuser');
        $cookies.remove('currentuser_id');
        $rootScope.token = null;
        $rootScope.currentuser = null;
        $rootScope.currentuser_id = null;
        $location.url('/log-in');
    };

}]);