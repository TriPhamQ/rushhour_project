myApp.controller('graphController', ['$scope', '$location', '$rootScope', '$cookies', 'graphFactory',  function ($scope, $location, $rootScope, $cookies, graphFactory){
	$rootScope.labels = [];
	$rootScope.series = [];
	$rootScope.data = [[]];
	var socket = io.connect();

	// $scope.socketControl = function(input){
	// 	var x;
	// 	if (input == 0){
	// 		x = 0;
	// 		socket.emit('down', {local:$rootScope.currentuser_id});
	// 	} else if (input != 0){
	// 		x += input;
	// 	}
	// 	if (x < 2 && x != 0){
	// 			socket.emit('up', {local:$rootScope.currentuser_id});
	// 		}
	// }

	var x = 0;
	var y = 0;
	$scope.socketControl = function(input){
		if (input === 1){
			x += 1;
			y = 0;
		} else if (input === 0){
			y += 1;
			x = 0;
		}

		if (x == 1){
			console.log("SOCKET SENT UP!!!!!!!!");
			graphFactory.showBusy(function(){
				socket.emit('up', {local:$rootScope.currentuser});
			});
		}
		if (y == 1){
			console.log("SOCKET SENT DOWN!!!!!!!!");
			graphFactory.notBusy(function(){
				socket.emit('down', {local:$rootScope.currentuser});
			});
		}
	}



	
	socket.on('COUNT_INCREASED', function(data){
		console.log('this is the fuckin problem');
		$scope.getdata();
	})
	$scope.getdata = function () {
		graphFactory.getData($rootScope.currentuser_id, function(output){
			console.log("DATA OUTPUT", output.data);
			$scope.test = output.data[0];
			load();
		})
	};
	function load() {
		// graphFactory.getData(function(output){
			var dps = []; // dataPoints
			console.log("TEST SCOPE",$scope.test);
			var chart = new CanvasJS.Chart("chartContainer",{
				title :{
					text: "Live Random Data"
				},
				data: [{
					type: "line",
					dataPoints: dps
				}]
			});
			// var xVal = (new Date($scope.test.count_time[0])).getSeconds()+(new Date($scope.test.count_time[0])).getHours()*60*60+(new Date($scope.test.count_time[0])).getMinutes()*60;
			var xVal = (new Date().getHours())*60*60+(new Date().getMinutes())*60+(new Date().getSeconds())-5*60;
			var yVal = 0;
			// var countT = 0;
			var updateInterval = 1000;
			var dataLength = 300; // number of dataPoints visible at any point

			var updateChart = function (count) {
				count = count || 1;
				var countT = 0;
				// count is number of times loop runs to generate random dataPoints.
				for (var j = 0; j < count; j++) {
					for (var i = 0; i < $scope.test.count_time.length; i++) {
						if ((new Date($scope.test.count_time[i])).getSeconds()+(new Date($scope.test.count_time[i])).getHours()*60*60+(new Date($scope.test.count_time[i])).getMinutes()*60 == xVal) {
							yVal ++;
							if (yVal > 5){
								console.log('SOCKET CONTROL WITH 11111111');
								$scope.socketControl(1);
							}
						}
					};
					// console.log("countT", countT);
					if (xVal%100 == 0) {
						yVal = 0;
						countT = 0;
						// sockethere~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						console.log('SOCKET CONTROL WITH 0000000');
						$scope.socketControl(0);
					};
					// yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
					dps.push({
						x: xVal,
						y: yVal
					});
					countT ++;
					xVal ++;
				};
				if (dps.length > dataLength)
				{
					dps.shift();
				}

				chart.render();

			};

			// generates first set of dataPoints
			updateChart(dataLength);

			// update chart after specified time.
			setInterval(function(){updateChart()}, updateInterval);
		// })
	}
	$scope.getdata();

	$scope.GraphClick = function (points, evt) {
	// console.log(points, evt);
	};
	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	$scope.options = {
	scales: {
	  yAxes: [
	    {
	      id: 'y-axis-1',
	      type: 'linear',
	      display: true,
	      position: 'left'
	    }
	  ]
	}
	};
}]);
