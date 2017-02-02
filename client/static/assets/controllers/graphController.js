myApp.controller('graphController', ['$scope', '$location', '$rootScope', '$cookies', 'graphFactory',  function ($scope, $location, $rootScope, $cookies, graphFactory){
	$rootScope.labels = [];
	$rootScope.series = [];
	$rootScope.data = [[]];

	$scope.getdata = function () {
		graphFactory.getData(function(output){
			console.log('output');
			var len = output.data.length;
			console.log(output.data);
			for (var i = 0; i < len; i++){
				var leng = output.data[i].count_time.length;
				$rootScope.series.push(output.data[i]._id);
				var timez = new Date(output.data[i].createdAt);
				console.log("Seconds",timez.getSeconds());
				console.log("Hours",timez.getHours());
				console.log("Minutes",timez.getMinutes());
				console.log(output.data[i].createdAt);
				for (var j = 0; j < leng; j++){
					$rootScope.labels.push(output.data[i].count_time[j]);
					$rootScope.data[0].push(j+1);
				}
			}
			// console.log('labels');
			// console.log($scope.labels);
			// console.log($scope.series);
		})
	};
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
