var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var config = require('./config.json');
var db = require('./model/db.js');
var log = require('./model/log.js');

/*
 *  Project Name: Kevin's Personal Website
 *  Author: Kevin Song
 *  Date  : 2015/7/27
 *  Reference: 
 *      1. How to use bodyparser? https://github.com/expressjs/body-parser
 *      2. ...
 */


// program mode, default set as production
var mode = "production";
if (process.argv && process.argv[2]) {
    // production to be passed as param
    mode = process.argv[2];
}
log.info("mode: " + mode);


// express app config here
var app = module.exports = express();

// express middle ware
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

// create application/json parser, this will parse the json form data from the req
var jsonParser = bodyParser.json();


// read the mock data
if (mode === "development") {
    // read the mock data
    var mockArticleListData    = require('./mock/article_list');
    var mockArticleListData2   = require('./mock/article_list_previous');
    var mockArticleData        = require('./mock/article_data');
    
    var mockArticleDataContent = fs.readFileSync('./mock/article_data_content.html', 'utf-8');
    mockArticleData.data.article_content = mockArticleDataContent;
}

// http response data
var successResponse = {
    "result": "success",
    "data": {}
};

var failResponse = {
    "result": "fail",
    "error": ""
};


// API: get_article_list
app.post('/get_article_list', jsonParser, function(req, res) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    
    // get the form data
    var currentPage = req.body.current_page;
    var articleNumPerPage = req.body.article_num_per_page;
    
    log.info("currentPage: " + currentPage + ", articleNumPerPage: " + articleNumPerPage);

    //return the mock mock
    if (mode === "development") {
        // return the data according to the num
        if (currentPage === 0) {
            res.write(JSON.stringify(mockArticleListData));
        }
        else if (currentPage === 1) {
            res.write(JSON.stringify(mockArticleListData2));
        }
        else {
            failResponse.error = "we don't have these data, begin: " + begin + ", end: " + end;
            res.write(JSON.stringify(failResponse));
        }
    }
    else {
        /*  query data from mongodb
         *  here we will use mongoose to get data from mongodb.
         *  and sort api can let us sort the data in mongodb before search. We sort as the date.
         *  and skip, limit api can let us achieve the range query when user query different page's data.
         */
        
        db.find({}, function(err, data) {
            if (err) {
                log.info("Database Error: get data from collection. Error: " + err);
                failResponse.error = err;
                res.write(JSON.stringify(failResponse));
                res.end();
            }
            else {
                log.info("Database: get data success. data.length: " + data.length);

                // get the number of the all articles
                db.count(function(err, count) {
                    if (err) {
                        log.info("Database Error: count articles number. Error: " + err);
                        failResponse.error = err;
                        res.write(JSON.stringify(failResponse));
                    }
                    else {
                        log.info("articles total number: " + count);
                    
                        successResponse.data = {};
                        successResponse.data.total_aritcle_num = count;
                        successResponse.data.article_list = data;
                        
                        // return response
                        res.write(JSON.stringify(successResponse));
                    }
                    res.end();
                });
            }
        }).select(db.show_fields).sort({'article_time':'desc'}).skip((currentPage-1) * articleNumPerPage).limit(articleNumPerPage);
    }
});

// API: get_article
app.post('/get_article', jsonParser, function(req, res) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    
    // get the article id
    var id = req.body._id;
    //log.info("id: " + id);
    
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
        res.end();
    }
    else {
        // query data from mongodb
        db.findById(id, function(err, data) {
            if (err) {
                log.info("Database Error: get data from collection. Error: " + err);
                failResponse.error = err;
                res.write(JSON.stringify(failResponse));
            }
            else {
                log.info("Database: get data success. Article title: " + data.article_title);
                successResponse.data = data;
                res.write(JSON.stringify(successResponse));
            }
            res.end();
        });
    }
});


// get port
var port = config.server.port;
log.info("Server listening on port: " + port);

// create server
http.createServer(app).listen(port);
