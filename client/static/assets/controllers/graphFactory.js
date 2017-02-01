myApp.factory('graphFactory', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
    console.log("Graph Factory");
    var factory = {};


    
    factory.getData = function(callback){
        $http.get('/add').then(function(output){
            console.log(output);
            callback();
        });
    };


    return factory;

}]);