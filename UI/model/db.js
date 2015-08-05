/*
 *  db.js
 *  This script will hold the database connection and event listeners.
 *
 */

var mongoose = require('mongoose');

// connect to db - blog
var dbConnectionString = 'mongodb://localhost/blog';
mongoose.connect(dbConnectionString);

// listen event: connected
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbConnectionString);
});

// listen event: error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

// listen event: disconnected
/*mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});*/

// if the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {
    // close the db connection
    mongoose.connection.close(function () { 
        console.log('Mongoose connection closed'); 
        process.exit(0); 
    });
});

// catch uncaught exception
process.on('uncaughtException', function (err) {
    console.error('Uncaught Exception: ', err.message);
    console.error("Error Stack: " + err.stack);
    
    // close the db connection
    mongoose.connection.close(function () { 
        console.log('Mongoose connection closed because of process uncaughtException'); 
        process.exit(1);
    });
});

// define the blog schema
var schema = mongoose.Schema;
var article = {
    "_id"                   : Number,
    "article_title"         : String,
    "article_title_pic"     : String,
    "article_author"        : String,
    "article_time"          : String,
    "article_read_number"   : Number,
    "article_comment_number": Number,
    "article_content"       : String
};

// create schema
var articleSchema = new schema(article);

// create model, the collections' name will be 'articles' by default
var articleModel = mongoose.model('article', articleSchema);

// make this available to our users in our Node applications
module.exports = articleModel;
