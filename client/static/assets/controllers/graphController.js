myApp.controller('graphController', ['$scope', '$location', '$rootScope', '$cookies', 'graphFactory',  function ($scope, $location, $rootScope, $cookies, graphFactory){
	$rootScope.labels = [];
	$rootScope.series = [];
	$rootScope.data = [];


	$scope.getdata = function () {
		graphFactory.getData(function(output){
			$scope.test = output.data[0];
		})
	};
	window.onload = function () {
		// graphFactory.getData(function(output){
			var dps = []; // dataPoints

			var chart = new CanvasJS.Chart("chartContainer",{
				title :{
					text: "Live Random Data"
				},
				data: [{
					type: "line",
					dataPoints: dps
				}]
			});
			var xVal = (new Date($scope.test.count_time[0])).getSeconds()+(new Date($scope.test.count_time[0])).getHours()*60*60+(new Date($scope.test.count_time[0])).getMinutes()*60;
			var yVal = 0;
			// var count = 0;
			var updateInterval = 100;
			var dataLength = 500; // number of dataPoints visible at any point

			var updateChart = function (count) {
				count = count || 1;
				// count is number of times loop runs to generate random dataPoints.
				for (var j = 0; j < count; j++) {
					for (var i = 0; i < $scope.test.count_time.length; i++) {
						if ((new Date($scope.test.count_time[i])).getSeconds()+(new Date($scope.test.count_time[i])).getHours()*60*60+(new Date($scope.test.count_time[i])).getMinutes()*60 == xVal) {
							yVal ++;
						};
					};
					// yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
					dps.push({
						x: xVal,
						y: yVal
					});
					xVal++;
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
