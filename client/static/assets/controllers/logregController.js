myApp.controller('logregController', ['$scope', 'usersFactory', '$location', '$rootScope', '$cookies', function ($scope, usersFactory, $location, $rootScope, $cookies) {
    console.log('logregController loaded');
	$scope.error = undefined;
    $scope.nextval = {};
    $scope.nextval.address = true;
    $scope.nextval.name = false;
    $scope.nextval.user = false;
    $scope.registrationDetails = {};

    $scope.startReg = function(){
        $location.url('/rush_hour/registration');
    }
    $scope.next = function(ax){
        console.log(ax);
        if ($scope.nextval.address == true){
            usersFactory.addressValidation(ax, function(output){
                console.log(output);
                if (output.status == 200){
                    console.log('results');
                    console.log(output);
                    $scope.registrationDetails.address = output.data[0].formatted_address;
                    $scope.registrationDetails.coords = output.data[0].geometry.location;
                    $scope.registrationDetails.placeId = output.data[0].place_id;
                    console.log($scope.registrationDetails);
                    $scope.item.address = '';
                    $scope.nextval.address = false;
                    $scope.nextval.name = true;
                } else {
                    console.log(output.status);
                }
            })
        } else if ($scope.nextval.name == true){
            $scope.registrationDetails.name = ax;
            console.log($scope.registrationDetails);
            $scope.nextval.name = false;
            $scope.nextval.user = true;
        } else if ($scope.nextval.user == true) {
            if ($scope.newBusiness.password == $scope.newBusiness.password_confirm) {
    			console.log($scope.newBusiness);
                $scope.registrationDetails.email = $scope.newBusiness.email;
                $scope.registrationDetails.password = $scope.newBusiness.password;
    			usersFactory.register($scope.registrationDetails, function (output) {
    				console.log("Output from register:", output.data);
                    if (!output.data.error) {
                        console.log("NO ERROR", output.data);
                        usersFactory.login({email: $scope.registrationDetails.email, password: $scope.registrationDetails.password}, function (output) {
                            console.log("test output", output);
                            if (!output.data.error) {
                			    $scope.nextval.user =false;
                                $location.url('/businessDash');
                			}
                            else {
                                console.log("ERROR IS", output.data.error);
                            };
                        });
                    }
                    else {
                        $scope.error = output.data.error;
                    };
        			$scope.newBusiness = {};
    			});
    		}
    		else {
    			$scope.error = "Password confirmation does not match!"
    		};
        }
    }

    $scope.startLog = function(){
        $location.url('/log-in')
    }

	$scope.regUser = function () {
		if ($scope.newBusiness.password == $scope.newBusiness.password_confirm) {
			console.log($scope.newBusiness);
			usersFactory.register($scope.newBusiness, function (output) {
				console.log("Output from register:", output.data);
                if (!output.data.error) {
                    console.log("NO ERROR", output.data);
                    usersFactory.login({email: $scope.newBusiness.email, password: $scope.newBusiness.password}, function (output) {
                        console.log(output);
                        if (!output.data.error) {
                            $location.url('/dashboard');
            			}
                        else {
                            console.log("ERROR IS", output.data.error);
                        };
                    });
                }
                else {
                    $scope.error = output.data.error;
                };
    			$scope.newBusiness = {};
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
                $location.url('/businessDash');
			}
            else {
                console.log("ERROR IS", output.data.error);
                $scope.error = output.data.error;
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
        $location.url('/log-in');
    };

    console.log("ROOT USER IS", $rootScope.currentuser);
}]);
