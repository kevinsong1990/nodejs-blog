var mongoose = require('mongoose');
var fs = require('fs');

var Schema = mongoose.Schema;
// define the blog schema
var articleSchema = new Schema({
    "_id"                   : Number,   //_id
    "article_title"         : String,
    "article_title_pic"     : String,
    "article_author"        : String,
    "article_time"          : String,
    "article_read_number"   : Number,
    "article_comment_number": Number,
    "article_content"       : String
});

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
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// create model
var Article = mongoose.model('article', articleSchema);

// make this available to our users in our Node applications
module.exports = Article;
