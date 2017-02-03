myApp.factory('mapFactory', ['$http', function ($http) {
	

	factory = {};

	var map;

	var locations = [];
	var busiest = [];
	var selectedLat = null;
	var selectedLong = null;

	factory.refresh = function(lat, long){
		locations = [];

		selectedLat = lat;
		selectedLong = long;

		getBusy();

		$http.get('/markers').then(function(output){
			console.log('happening');
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
            		maxWidth: 320,
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
			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 1,
				center: myLatLng
			});
		}

		updateMarkers();

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

	var updateMarkers = function(){
				locations.forEach(function(n, i){
			console.log('N is : ', n.username);
			var flag = 0;
			for (var cat = 0; cat < busiest.length; cat++){
				if (n.username == busiest[cat]){
					flag++
				}
			}
			if (flag > 0){
				var marker = new google.maps.Marker({
					position: n.latlon,
					map: map,
					title: "Rush Hour Map",
					icon: 'http://www.googlemapsmarkers.com/v1/FF0000/',
				});

			} else {
				var marker = new google.maps.Marker({
					position: n.latlon,
					map: map,
					title: "Rush Hour Map",
					icon: 'http://www.googlemapsmarkers.com/v1/0000FF/',
			});

			}

			google.maps.event.addListener(marker, 'click', function(e){
				currentSelectedMarker = n;
				n.message.open(map, marker);
			});
		});
	}


	var getBusy = function(){
		$http.get('/get_busy').then(function(output){
			console.log(output);
		})
	}


	var socket = io.connect();
    socket.on('mapUp', function(data){
        console.log('these are the locations', data.data.local);
        busiest.push(data.data.local);
        updateMarkers();
    })
    socket.on('mapDown', function(data){
        console.log('locations not busy', data);
        var x = 0;
        for (var i = 0; i < busiest.length; i++){
        	if (busiest[i] == data.data.local){
        		x = i;
        		break;
        	}
        }
        busiest.splice(x, 1);
        updateMarkers();
    })

	// google.maps.event.addDomListener(window, 'load',
	// 	factory.refresh(selectedLat, selectedLong));


	return factory;

}]);
