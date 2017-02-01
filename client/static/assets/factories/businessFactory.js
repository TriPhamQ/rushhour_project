myApp.factory('businessFactory', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
    console.log("Business Factory");
    var factory = {};
    factory.addItem = function(data, callback){
        $http.post('/add', data).then(function(output){
            console.log(output.data);
            callback();
        });
    };
    factory.getItems = function(callback){
        $http.get('/getItem').then(function(output){
            callback(output.data);
        });
    };
    factory.increaseCount = function(data, callback) {
        $http.post('/increase', {id: data}).then(function(output) {
            callback(output.data);
        });
    }
    return factory;

}]);
