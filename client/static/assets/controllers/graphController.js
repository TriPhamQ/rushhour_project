myApp.controller('graphController', ['$scope', '$location', '$rootScope', '$cookies', 'graphFactory',  function ($scope, $location, $rootScope, $cookies, graphFactory){
	$scope.labels = [];
	$scope.series = [];
	$scope.data = [[]];

	graphFactory.getData(function(output){
		console.log('output');
		var len = output.data.length;
		console.log(output.data);
		for (var i = 0; i < len; i++){
			var leng = output.data[i].count_time.length;
			$scope.series.push(output.data[i]._id);
			var timez = new Date(output.data[i].createdAt);
			console.log("Seconds",timez.getSeconds());
			console.log("Hours",timez.getHours());
			console.log("Minutes",timez.getMinutes());
			console.log(output.data[i].createdAt);
			for (var j = 0; j < leng; j++){
				$scope.labels.push(output.data[i].count_time[j]);
				$scope.data[0].push(j+1);
			}
		}
		// console.log('labels');
		// console.log($scope.labels);
		// console.log($scope.series);
	})




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
