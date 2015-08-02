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

myApp.directive("comment", function() {
    return {
        restrict: 'A',
        link: function(scope){
            var article_id = scope.article_id;
            var data_thread_key = '';
            var data_url = '';
            var data_author_key = '';
            
            if (!article_id || article_id === '') {
                console.log("This is board page.");
                // get the variable from controller
                data_thread_key = 'board';
                data_url = 'board';
                data_author_key = 'http://blogtest.com/#!/board.html';
            }
            else {
                console.log("This is article page. article_id: " + article_id);
                // get the variable from controller
                data_thread_key = 'article_' + article_id;
                data_url = 'article_' + article_id;
                data_author_key = 'http://blogtest.com/#!/article.html/' + article_id;
            }
            
            // dynamic load the duoshuo comment box
            var el = document.createElement('div');//该div不需要设置class="ds-thread"
			el.setAttribute('data-thread-key', data_thread_key);//必选参数
			el.setAttribute('data-url', data_url);//必选参数
			el.setAttribute('data-author-key', data_author_key);//可选参数
			DUOSHUO.EmbedThread(el);
			jQuery('#comment-box').append(el);
        }
    };
});
