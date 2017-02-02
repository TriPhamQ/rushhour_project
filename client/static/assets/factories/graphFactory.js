myApp.factory('graphFactory', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
    console.log("Graph Factory");
    var factory = {};



    factory.getData = function(callback){
        $http.get('/get_data').then(function(output){
            callback(output);
        });
    };


    return factory;

}]);