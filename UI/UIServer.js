var express = require('express');
var http    = require('http');
var path    = require('path');
var config  = require('./config.json');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

/*
 *  Project Name: Kevin's Personal Website
 *  Author: Kevin Song
 *  Date  : 2015/7/27
 *  Reference: 
 *      1. How to use bodyparser? https://github.com/expressjs/body-parser
 *      2. ...
 */


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

// express middle ware
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

// create application/json parser, this will parse the json form data from the req
var jsonParser = bodyParser.json();

// API: get_article_list
app.post('/get_article_list', jsonParser, function(req, res) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    
    //return the mock data
    if (mode === "development") {
        res.write(JSON.stringify(mockArticleListData));
 
        // print the form data
        console.log(req.body.article_begin);
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
