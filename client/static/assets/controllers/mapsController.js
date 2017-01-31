myApp.controller('mapsController', function($scope, mapFactory){
	$scope.markers = [];
	mapFactory.getMarkers(function(output){
		console.log(output);
		$scope.markers = output;
	})

	var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(90,80),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

})