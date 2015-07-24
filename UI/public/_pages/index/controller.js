// controller
myControllers.controller('indexContrl', ['$scope', 'RestServer', function ($scope, RestServer) {
    // get article list from server
    var get_article_list = function () {
        RestServer.get(
            "/get_article_list",
            function (response) {
                // success
                console.log(response);
            },
            function (response) {
                // failed
                console.log("Error when get article list.");
                $scope.errorMessage = err;
            }
        );
    };

    // main
    console.log("get article list");
    get_article_list();
}]);
