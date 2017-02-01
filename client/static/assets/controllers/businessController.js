myApp.controller('businessController', ['$scope', '$location', '$rootScope', '$cookies', 'businessFactory',  function ($scope, $location, $rootScope, $cookies, businessFactory){

	console.log('businessController');

	$scope.error_message = "";
	$scope.items = [];

	$scope.logOut = function () {
        $cookies.remove('token');
        $cookies.remove('currentuser');
        $cookies.remove('currentuser_id');
        $rootScope.token = null;
        $rootScope.currentuser = null;
        $rootScope.currentuser_id = null;
        $location.url('/log-in');
    };

	// the submit button to add an item
	$scope.submit = function() {
		console.log($scope.addItem);
		if(!$scope.addItem) {
			$scope.error_message = "Item needs to be filled";
		} else {
			console.log("Item is filled");
			$scope.error_message = "";
			console.log("no errors");
			$scope.addItem._user = $rootScope.currentuser_id;
			$scope.addItem.count = 0;
			businessFactory.addItem($scope.addItem, function() {
				console.log("Successfully saved an Item");
				businessFactory.getItems(function(output) {
			    $scope.items = output;
			    console.log($scope.items);
				$scope.addItem = undefined;
				});
			});

		}
	};
	businessFactory.getItems(function(output) {
    $scope.items = output;
    console.log($scope.items);
	});

	// increasing count function
	$scope.addCount = function(id) {
		console.log(id);
		businessFactory.increaseCount(id, function() {
			console.log("Successfully increase count by one");
			businessFactory.getItems(function(output) {
				$scope.items = output;
				console.log($scope.items);

			})
		})
	}


}]);
