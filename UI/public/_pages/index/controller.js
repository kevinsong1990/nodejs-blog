// controller
myControllers.controller('indexContrl', ['$scope', 'RestServer', function ($scope, RestServer) {
    // data
    $scope.article_list = [];
    // default show 5 articles per page
    $scope.article_num_per_page = 5;
    // current article list, default is the 1st page
    $scope.current_page = 1;
    // article number we got from backend
    $scope.total_aritcle_num = 0;
    // show the "before" button
    $scope.show_before = false;
    // show the "next" button
    $scope.show_next = false;
    

    // show or hide the before/next button for paging
    var controllButtonShowOrHide = function () {
        //console.log("$scope.total_aritcle_num: " + $scope.total_aritcle_num + ", $scope.article_num_per_page: " + $scope.article_num_per_page + ", $scope.current_page: " + $scope.current_page);
        if ($scope.total_aritcle_num > $scope.article_num_per_page * $scope.current_page) {
            // it means there are still some articles didn't show
            $scope.show_next = true;
        }
        else {
            $scope.show_next = false;
        }

        if ($scope.current_page > 1) {
            // it means we are not the first page now
            $scope.show_before = true;
        }
        else {
            $scope.show_before = false;
        }
    };
    
    // get article list from server
    var get_article_list = function (current_page, article_num_per_page) {
        RestServer.post(
            "/get_article_list",
            {
                article_begin: (current_page - 1) * article_num_per_page,
                article_end: current_page * article_num_per_page
            },
            function (response) {
                if (response.result === "success") {
                    // success
                    //console.log(response.data);
                    
                    $scope.total_aritcle_num = response.data.total_aritcle_num;
                    console.log("article number: " + $scope.total_aritcle_num);

                    // init the article_list
                    $scope.article_list = [];

                    var list = response.data.article_list;
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

                    //console.log("$scope.article_list: " + JSON.stringify($scope.article_list));
                }
                else {
                    console.log("get_article_list fail, error: " + response.error);
                    $scope.errorMessage = response.error;
                }

                // show button
                controllButtonShowOrHide();
                //console.log("$scope.show_before: " + $scope.show_before + ", $scope.show_next: " + $scope.show_next);
            },
            function (err) {
                // failed
                console.log("get_article_list fail, error: " + err);
                $scope.errorMessage = err;
            }
        );
    };

    $scope.showBefore = function () {
        if ($scope.current_page <= 1) {
            $scope.errorMessage = "This is already the 1st page.";
            return;
        }

        $scope.current_page = $scope.current_page - 1;
        get_article_list($scope.current_page, $scope.article_num_per_page); 
    };

    $scope.showNext = function () {
        $scope.current_page = $scope.current_page + 1;
        get_article_list($scope.current_page, $scope.article_num_per_page);
    };

    // main
    get_article_list($scope.current_page, $scope.article_num_per_page);
}]);
