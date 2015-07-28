// Declare angular JS level module wich depends on filters, and services
var myApp = angular.module('myApp', [ 'ngRoute', 'myControllers']);

// route
myApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
        when(
                '/',
			    {
				    templateUrl: '_pages/index/index.html',
				    controller: 'indexContrl'
			    }
	    ).
        when(
                '/board.html',
			    {
				    templateUrl: '_pages/board/index.html',
				    controller: ''
			    }
	    ).
        when(
                '/about.html',
			    {
				    templateUrl: '_pages/about/index.html',
				    controller: ''
			    }
	    ).
        when(
                '/article.html/:id',
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
