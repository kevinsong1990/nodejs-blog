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
                '/about.html',
			    {
				    templateUrl: '_pages/about/index.html',
				    controller: ''
			    }
	    ).
        when(
                '/post.html',
			    {
				    templateUrl: '_pages/article/index.html',
				    controller: ''
			    }
	    ).
		otherwise( {
			redirectTo: '/'
		});
	}
]);
