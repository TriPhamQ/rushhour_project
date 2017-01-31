var myApp = angular.module('app', ['ngRoute', 'ngCookies', 'ngAnimate']);

myApp.config(function ($routeProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'partials/homepage.html',
		controller: ''
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
		redirectTo: '/home'
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

