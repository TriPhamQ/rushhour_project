myApp.controller('mapsController', function($scope, mapFactory){

	$scope.local = {};

    if (navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(function(position){
    		console.log(position);
    		console.log('coords found');
			if (position) {
				console.log("true");
				mapFactory.refresh(position.coords.latitude, position.coords.longitude);
			}
			else {
				console.log("false");
                $scope.local.latitude = 34.019015;
                $scope.local.longitude = -118.490112;
                console.log('browser location support not available');
                mapFactory.refresh($scope.local.latitude, $scope.local.longitude);
			}
    	})
    } else {
    	$scope.local.latitude = 34.019015;
    	$scope.local.longitude = -118.490112;
    	console.log('browser location support not available')
    	mapFactory.refresh($scope.local.latitude, $scope.local.longitude);
    }
})
