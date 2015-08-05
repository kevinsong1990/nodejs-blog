// controller
myControllers.controller('articleContrl', ['$scope', 'RestServer', '$routeParams', function ($scope, RestServer, $routeParams) {
    // data
    $scope.article_data = {};

    // article id
    $scope._id = $routeParams.id;
    //console.log("$scope._id: " + $scope._id);

    // get article data from server
    var get_article = function (_id) {
        RestServer.post(
            "/get_article",
            {
                "_id": _id
            },
            function (response) {
                if (response.result === "success") {
                    // success
                    $scope.article_data = response.data;
                }
                else {
                    console.log("get_article fail, error: " + response.error);
                    $scope.errorMessage = response.error;
                }
            },
            function (err) {
                // failed
                console.log("get_article fail, error: " + err);
                $scope.errorMessage = err;
            }
        );
    };
    
    // main
    get_article($scope._id);
}]);
