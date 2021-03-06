/*
 *  db.js
 *  This script will hold the database connection and event listeners.
 *
 */

var mongoose = require('mongoose');
var config   = require('./../config.json');
var log      = require('./log.js');

// connect to db - blog
var dbConnectionString = config.db.uri;
mongoose.connect(dbConnectionString);

// listen event: connected
mongoose.connection.on('connected', function() {
    log.info('Mongoose connected to ' + dbConnectionString);
});

// listen event: error
mongoose.connection.on('error', function(err) {
    log.info('Mongoose connection error: ' + err);
});

// listen event: disconnected
/*mongoose.connection.on('disconnected', function() {
    log.info('Mongoose default connection disconnected');
});*/

// if the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {
    // close the db connection
    mongoose.connection.close(function () { 
        log.info('Mongoose connection closed'); 
        process.exit(0); 
    });
});

// catch uncaught exception
process.on('uncaughtException', function (err) {
    console.error('Uncaught Exception: ', err.message);
    console.error("Error Stack: " + err.stack);
    
    // close the db connection
    mongoose.connection.close(function () { 
        log.info('Mongoose connection closed because of process uncaughtException'); 
        process.exit(1);
    });
});

// define the blog schema
var schema = mongoose.Schema;
var article = {
    "_id"                   : Number,
    "article_title"         : String,
    "article_sub_title"     : String,
    "article_title_pic"     : String,
    "article_author"        : String,
    "article_time"          : Date,
    "article_read_number"   : Number,
    "article_comment_number": Number,
    "article_content"       : String
};

// only query these fields when get_article_list
var show_fields = {
    "_id"                   : 1,
    "article_title"         : 1,
    "article_sub_title"     : 1,
    "article_title_pic"     : 1,
    "article_author"        : 1,
    "article_time"          : 1,
    "article_read_number"   : 1,
    "article_comment_number": 1
};

// create schema
var articleSchema = new schema(article);

// create model, the collections' name will be 'articles' by default
var articleModel = mongoose.model('article', articleSchema);

// make this available to our users in our Node applications
module.exports = articleModel;
module.exports.show_fields = show_fields;
