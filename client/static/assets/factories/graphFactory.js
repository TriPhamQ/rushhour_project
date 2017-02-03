myApp.factory('graphFactory', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
    console.log("Graph Factory");
    var factory = {};



    factory.getData = function(id, callback){
        $http.post('/get_data', {userid: id}).then(function(output){
            callback(output);
        });
    };


    factory.showBusy = function(callback){
    	$http.post('/show_busy', {userid:$rootScope.currentuser}).then(function(){
	    	console.log('nice');
	    	callback();
   		});
    };

    factory.notBusy = function(callback){
    	$http.post('/not_busy', {userid:$rootScope.currentuser}).then(function(){
    		callback();
    	})
    }


    return factory;

}]);
