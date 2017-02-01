myApp.controller('graphController', ['$scope', '$location', '$rootScope', '$cookies', 'graphFactory',  function ($scope, $location, $rootScope, $cookies, businessFactory){
	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A'];
	$scope.data = [[0]];

	graphFactory.getData(function(output){
		console.log(output);
	})




	$scope.onClick = function (points, evt) {
	console.log(points, evt);
	};
	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
	$scope.options = {
	scales: {
	  yAxes: [
	    {
	      id: 'y-axis-1',
	      type: 'linear',
	      display: true,
	      position: 'left'
	    },
	    {
	      id: 'y-axis-2',
	      type: 'linear',
	      display: true,
	      position: 'right'
	    }
	  ]
	}
	};
}]);