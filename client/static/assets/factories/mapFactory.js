myApp.factory('mapFactory', ['$http', function ($http) {
	var socket = io.connect();
    socket.on('mapUp', function(data){
        console.log('Map Factory: ', data);
    })

	factory = {};

	var locations = [];

	var selectedLat = null;
	var selectedLong = null;

	factory.refresh = function(lat, long){
		locations = [];

		selectedLat = lat;
		selectedLong = long;

		$http.get('/markers').then(function(output){
			locations = convertToMapPoints(output.data);
			initialize(lat, long);
		});
	};

	var convertToMapPoints = function(output){
		console.log(output);
		var locations = [];
		var len = output.length;
		var user;
		for (var i = 0; i < len; i++){
			user = output[i];
			var contentString =
				'<p><b>Name</b>: ' + user.name +
                '<br><b>Adress</b>: ' + user.address +
                '</p>';

            locations.push({
            	latlon: new google.maps.LatLng(user.coords.lat, user.coords.lng),
            	message: new google.maps.InfoWindow({
            		content: contentString,
            		maxWidth: 320
            	}),
            	username: user.name,
            	address:user.address
            });
		};

		return locations;
	}

	var initialize = function(lat, long){
		var myLatLng = {lat: selectedLat, lng: selectedLong};

		if (!map){
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 15,
				center: myLatLng
			});
		}

		locations.forEach(function(n, i){
			var marker = new google.maps.Marker({
				position: n.latlon,
				map: map,
				title: "Rush Hour Map",
				icon: 'http://www.googlemapsmarkers.com/v1/0000FF/',
			});

			google.maps.event.addListener(marker, 'click', function(e){
				currentSelectedMarker = n;
				n.message.open(map, marker);
			});
		});

		var initalLocation = new google.maps.LatLng(lat, long);
		var marker = new google.maps.Marker({
			position: initalLocation,
			animation: google.maps.Animation.Bounce,
			map: map,
			icon: ''
		});
		lastMarker = marker;
		// Place a draggable marker on the map


	};

	// google.maps.event.addDomListener(window, 'load',
	// 	factory.refresh(selectedLat, selectedLong));


	return factory;

}]);
