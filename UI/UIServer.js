var express = require('express');
var http    = require('http');
var path    = require('path');
var favicon = require('serve-favicon');
var config  = require('./config.json');

// program mode, default set as development
var mode = "development";
if (process.argv && process.argv[2]) {
    // production to be passed as param
    mode = process.argv[2];
}
console.log("mode: " + mode);

if (mode === "development") {
    // read the mock data
    var mockArticleListData    = require('./mock/article_list');
    var mockArticleData        = require('./mock/article_data');
    var mockArticleCommentData = require('./mock/article_comment');
}

// express app config here
var app = module.exports = express();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/get_article_list', function(req, res) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    
    //return the mock data
    if (mode === "development") {
        res.write(JSON.stringify(mockArticleListData));
    }
    else {
        //...
    }

    res.end();
});


// get port
var port = config.port;
console.log("Server listening on port: " + port);

// create server
http.createServer(app).listen(port);
