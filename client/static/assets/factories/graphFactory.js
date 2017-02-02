myApp.factory('graphFactory', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
    console.log("Graph Factory");
    var factory = {};



    factory.getData = function(id, callback){
        $http.post('/get_data', {userid: id}).then(function(output){
            callback(output);
        });
    };


    return factory;

}]);
