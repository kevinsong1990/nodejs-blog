// Declare angular JS level module wich depends on filters, and services
var myApp = angular.module('myApp', [ 'ngRoute', 'myControllers']);

// route
myApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
        when(
                '/',
			    {
				    templateUrl: 'index.html',
				    controller: 'indexContrl'
			    }
	    ).
		otherwise( {
			redirectTo: '/404'
		});
	}
]);
