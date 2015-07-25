// controller
myControllers.controller('indexContrl', ['$scope', 'RestServer', function ($scope, RestServer) {
    // data
    $scope.article_list = [];
        
    // get article list from server
    var get_article_list = function () {
        RestServer.get(
            "/get_article_list",
            function (response) {
                // success
                //console.log(response.data);

                var list = response.data;
                for (var i=0; i<list.length; i++) {
                    //console.log(list[i].article_title);
                    
                    // change the data format
                    var time = list[i].article_time;
                    time = moment(time).format('LL');
                    //console.log("time: " + time);
                    
                    list[i].article_time = time;

                    // push the data into array
                    $scope.article_list.push(list[i]);
                }

                console.log("$scope.article_list: " + JSON.stringify($scope.article_list));
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
