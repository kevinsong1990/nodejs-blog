myApp.filter('formatDate', function() {
    return function(input) {
        // use the moment js to format the date
        return moment(input).format('LL');
    };
});

myApp.filter('toHtml', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

