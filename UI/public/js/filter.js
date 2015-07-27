myApp.filter('formatDate', function() {
    return function(input) {
        // use the moment js to format the date
        return moment(input).format('LL');
    };
});
