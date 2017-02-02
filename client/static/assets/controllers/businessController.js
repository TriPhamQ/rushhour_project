myApp.controller('businessController', ['$scope', '$location', '$rootScope', '$cookies', 'businessFactory',  function ($scope, $location, $rootScope, $cookies, businessFactory){

	console.log('businessController');

	$scope.sales = true;
	$scope.create = null;
	$scope.performance = null;

	$scope.tabOver = function(choice){
		$scope.create = null;
		$scope.sales = null;
		$scope.performance = null;
		switch (choice){
			case 1:
				$scope.sales = true;
				break;
			case 2:
				$scope.create = true;
				break;
			case 3:
				$scope.performance = true;
				break;
		}
	}

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
		console.log($scope.addItem.item);
		if(!$scope.addItem.item) {
			$scope.error_message = "Item needs to be filled";
		} else {
			console.log("Item is filled");
			$scope.error_message = "";
			if(!$scope.addItem.image) {
				$scope.addItem.image = "https://media.giphy.com/media/ktvFa67wmjDEI/giphy.gif";

				console.log("no errors");
				$scope.addItem._user = $rootScope.currentuser_id;
				$scope.addItem.count = 0;
				businessFactory.addItem($scope.addItem, function() {
					console.log("Successfully saved an Item");
					businessFactory.getItems(function(output) {
				    $scope.items = output;
				    console.log($scope.items);
					$scope.addItem = undefined;
					$scope.tabOver(1);
					});
				});
			}
		}
	};
	businessFactory.getItems(function(output) {
	    $scope.items = output;
	    console.log($scope.items);
	});

	// increasing count function
	$scope.addCount = function(id) {
		businessFactory.increaseCount(id, function(output) {
			console.log("Successfully increase count by one");
			businessFactory.getItems(function(output) {
	    	$scope.items = output;
	    	console.log($scope.items);
	});
		});
	};

	// delete an item
	$scope.delete = function(id) {
		console.log(id);
		businessFactory.deleteItem(id, function(output) {
			console.log(output);
			$scope.items = output.data;
		});
	}
}]);
