myApp.controller('graphController', ['$scope', '$location', '$rootScope', '$cookies', 'graphFactory',  function ($scope, $location, $rootScope, $cookies, graphFactory){
	$scope.labels = [];
	$scope.series = ['Series A'];
	$scope.data = [[]];

	graphFactory.getData(function(output){
		console.log('output');
		var len = output.data.length;
		for (var i = 0; i < len; i++){
			var leng = output.data[i].count_time.length
			console.log(output.data[i]);
			for (var j = 0; j < leng; j++){
				$scope.labels.push(output.data[i].count_time[j]);
				$scope.data[0].push(j);
			}
		}
		console.log('labels');
		console.log($scope.labels);
	})




	$scope.GraphClick = function (points, evt) {
	console.log(points, evt);
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
	    },
	  ]
	}
	};
}]);