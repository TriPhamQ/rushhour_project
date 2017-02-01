var myApp = angular.module('app', ['ngRoute', 'ngCookies', 'ngAnimate', 'chart.js']);

myApp.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/homepage.html',
		controller: 'mapsController'
	})
	.when('/log-in', {
		templateUrl: 'partials/logreg.html',
		controller: 'logregController'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'logregController'
	})
	.when('/rush_hour/registration', {
		templateUrl: 'partials/startreg.html',
		controller: 'logregController'
	})
	.when('/businessDash', {
		templateUrl: 'partials/businessDash.html',
		controller: 'businessController'
	})
	.otherwise({
		redirectTo: '/'
	});
});

myApp.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

// myApp.config(function(uiGmapGoogleMapApiProviders){
// 	uiGmapGoogleMapApiProviders.configure({
// 		key: 'AIzaSyCipGKNRqwoj-UbQ3eJbYy5rCHeRE2vjNE',
// 		v: '3.17'
// 		libraries: 'geometry,visualization'
// 	})
// })
