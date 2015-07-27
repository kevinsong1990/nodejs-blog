myApp.directive("footer", function() {
    return {
        restrict: 'A',
        templateUrl: '_pages/partials/footer.html',
        scope: true,
        transclude : false
        //controller: 'FooterController'
    };
});

myApp.directive("menu", function() {
    return {
        restrict: 'A',
        templateUrl: '_pages/partials/menu.html',
        scope: true,
        transclude : false
        //controller: 'FooterController'
    };
});
