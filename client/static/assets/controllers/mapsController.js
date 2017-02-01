myApp.controller('mapsController', function($scope, mapFactory){
	

	$scope.local = {};
    
    if (navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(function(position){
    		console.log(position);
    		$scope.local.latitude = position.coords.longitude;
    		$scope.local.longitude = position.coords.latitude;
    		console.log('coords found');
    		mapFactory.refresh($scope.local.latitude, $scope.local.longitude);
    	})
    } else {
    	$scope.local.latitude = 34.0195;
    	$scope.local.longitude = 118.4912;
    	console.log('browser location support not available')
    	mapFactory.refresh($scope.local.latitude, $scope.local.longitude);
    }



})