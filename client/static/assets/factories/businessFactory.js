myApp.factory('businessFactory', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
    console.log("Business Factory");
    var factory = {};
    factory.addItem = function(data, callback){
        $http.post('/add', data).then(function(output){
            console.log(output.data);
            callback();
        });
    };
    factory.getItems = function(id, callback){
        $http.post('/getItem', {userid: id}).then(function(output){
            callback(output.data);
        });
    };
    factory.increaseCount = function(data, callback) {
        $http.post('/increase', {id: data}).then(function(output) {
            callback(output);
        });
    };
    factory.deleteItem = function(data, id, callback) {
        $http.post('/items/delete', {id: data, userid: id}).then(function(output) {
            console.log(output);
            callback(output);
        });
    };
    return factory;

}]);
