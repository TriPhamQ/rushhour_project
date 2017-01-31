var myApp = angular.module('app', ['ngRoute', 'ngCookies']);

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
	.otherwise({
		redirectTo: '/home'
	});
});
