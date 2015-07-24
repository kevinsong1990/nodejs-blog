// controller
myControllers.controller('indexContrl', ['$scope', 'RestServer', function ($scope, RestServer) {
    // get article list from server
    var get_article_list = function () {
        RestServer.get(
            "/get_article_list",
            function (response) {
                // success
                console.log(response.data);

                var list = response.data;
                for (var i=0; i<list.length; i++) {
                    console.log(list[i].article_title);
                }
            },
            function (err) {
                // failed
                console.log("Error when get article list. Error: " + err);
                $scope.errorMessage = err;
            }
        );
    };

    // main
    get_article_list();
}]);
