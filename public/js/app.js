// Declare angular JS level module wich depends on filters, and services
var myApp = angular.module('myApp', [ 'ngRoute', 'myControllers']);

// route
myApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
        // add prefix
        //$locationProvider.hashPrefix('!');

		$routeProvider.
        when(
                '/',
			    {
				    templateUrl: '_pages/index/index.html',
				    controller: 'indexContrl'
			    }
	    ).
        when(
                '/anotherblog',
			    {
				    templateUrl: '_pages/anotherblog/index.html',
				    controller: ''
			    }
	    ).
        when(
                '/lab',
			    {
				    templateUrl: '_pages/lab/index.html',
				    controller: ''
			    }
	    ).
        when(
                '/about',
			    {
				    templateUrl: '_pages/about/index.html',
				    controller: ''
			    }
	    ).
        when(
                '/board',
			    {
				    templateUrl: '_pages/board/index.html',
				    controller: ''
			    }
	    ).
        when(
                '/article/:id',
			    {
				    templateUrl: '_pages/article/index.html',
				    controller: 'articleContrl'
			    }
	    ).
		otherwise( {
			redirectTo: '/'
		});
	}
]);

// controller
var myControllers = angular.module('myControllers', []); 
