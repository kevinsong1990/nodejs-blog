// factory
myApp.factory('RestServer', 
    function($http) {
        return {
            post: function(url, json_data, success, failure) {
                    return $http.post( url, json_data)
                    .success(function(data) {
                        data = JSON.parse( $("<div></div>").text( JSON.stringify(data) ).html() );
                        if (success) success(data);
                    })
                    .error(function(err) {
                        if (failure) failure(err);
                    }).then();
                },
      
            get: function(url, success, failure) {
                    console.log("here");
                    return $http.get(url, { cache: false })
                    .success(function(data) {
                        data = JSON.parse( $("<div></div>").text( JSON.stringify(data) ).html() );
                        if (success) success(data);
                    })
                    .error(function(err) {
                        if (failure) failure(err);
                    }).then();
                }
        };
    }
);
