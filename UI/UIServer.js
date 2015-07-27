var express = require('express');
var http    = require('http');
var path    = require('path');
var fs      = require('fs');
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

// read the mock data
if (mode === "development") {
    // read the mock data
    var mockArticleListData    = require('./mock/article_list');
    var mockArticleListData2   = require('./mock/article_list_previous');
    var mockArticleData        = require('./mock/article_data');
    var mockArticleCommentData = require('./mock/article_comment');
    
    var mockArticleDataContent = fs.readFileSync('./mock/article_data_content.html', 'utf-8');
    mockArticleData.data.article_content = mockArticleDataContent;
}

// when handle request fail, return this json to frontend
var failResponse = {
    "result": "fail",
    "error": ""
};


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
    
    // get the form data
    var begin = req.body.article_begin;
    var end   = req.body.article_end;
    
    //return the mock mock
    if (mode === "development") {
        // return the data according to the num
        if (begin === 0 && end === 5) {
            res.write(JSON.stringify(mockArticleListData));
        }
        else if (begin === 5 && end === 10) {
            res.write(JSON.stringify(mockArticleListData2));
        }
        else {
            failResponse.error = "we don't have these data, begin: " + begin + ", end: " + end;
            res.write(JSON.stringify(failResponse));
        }
    }
    else {
        //...
    }

    res.end();
});

// API: get_article
app.post('/get_article', jsonParser, function(req, res) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    
    // get the article id
    var id = req.body.article_id;
    //console.log("id: " + id);
    
    //return the mock mock
    if (mode === "development") {
        // return the data according to the num
        if (id == 1) {
            res.write(JSON.stringify(mockArticleData));
        }
        else {
            failResponse.error = "we don't have this article, id: " + id;
            res.write(JSON.stringify(failResponse));
        }
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
