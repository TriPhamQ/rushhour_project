myApp.factory('graphFactory', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
    console.log("Graph Factory");
    var factory = {};



    factory.getData = function(id, callback){
        $http.post('/get_data', {userid: id}).then(function(output){
            callback(output);
        });
    };


    factory.showBusy = function(callback){
    	$http.post('/show_busy', {userid:$rootScope.currentuser_id}).then(function(){
            console.log("BUSYYYYYYYYYYYYYYYYYYYYYYY", $rootScope.currentuser_id);
	    	console.log('nice');
	    	callback();
   		});
    };

    factory.notBusy = function(callback){
    	$http.post('/not_busy', {userid:$rootScope.currentuser_id}).then(function(){
            console.log("NOT BUSYYYYYYYYYYYYYYYYYYYYYYY", $rootScope.currentuser_id);
    		callback();
    	})
    }


    return factory;

}]);
