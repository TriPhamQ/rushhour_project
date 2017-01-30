myApp.controller('logregController', ['$scope', 'usersFactory', '$location', '$rootScope', '$cookies', function ($scope, usersFactory, $location, $rootScope, $cookies) {
    console.log('logregController loaded');
	$scope.error = undefined;

	$scope.regUser = function () {
		if ($scope.newUser.password == $scope.newUser.password_confirm) {
			console.log($scope.newUser);
			usersFactory.register($scope.newUser, function (output) {
				console.log("Output from register:", output.data);
                if (!output.data.error) {
                    console.log("NO ERROR", output.data);
                    usersFactory.login({email: $scope.newUser.email, password: $scope.newUser.password}, function (output) {
                        console.log(output);
                        if (!output.data.error) {
            			    // console.log("SUCCESS, USER IS", output.data._id);
                            $location.url('/dashboard');
            			}
                        else {
                            console.log("ERROR IS", output.data.error);
                        };
                    });
                };
    			$scope.newUser = {};
			});
		}
		else {
			$scope.error = "Password confirmation does not match!"
		};
	};

	$scope.logUser = function () {
		console.log($scope.login);
		usersFactory.login($scope.login, function (output) {
			if (!output.data.error) {
                // console.log(output.data);
			    // console.log("SUCCESS, USER IS", output.data._id);
                $location.url('/dashboard');
			}
            else {
                console.log("ERROR IS", output.data.error);
            };
            $scope.login = {};
		});
	};

    $scope.logOut = function () {
        $cookies.remove('token');
        $cookies.remove('currentuser');
        $cookies.remove('currentuser_id');
        $rootScope.token = null;
        $rootScope.currentuser = null;
        $rootScope.currentuser_id = null;
        $location.url('/');
    };

    console.log("ROOT USER IS", $rootScope.currentuser);
}]);
