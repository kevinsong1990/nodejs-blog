var mongoose = require('mongoose');
var fs = require('fs');

var Schema = mongoose.Schema;
// define the blog schema
var articleSchema = new Schema({
    "_id"                   : Number,   //_id
    "article_title"         : String,
    "article_sub_title"     : String,
    "article_title_pic"     : String,
    "article_author"        : String,
    "article_time"          : Date,
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
var articleModel = mongoose.model('article', articleSchema);

// create entity
var articleEntity1 = new articleModel({
    "_id"                   : 1,
    "article_title"         : "在孤独中，一个人要像一支队伍",
    "article_sub_title"     : "我的第一篇随笔",
    "article_title_pic"     : "img/article/article_1_title.jpg",
    "article_author"        : "Kevin Song",
    "article_time"          : "2015-08-12T22:23:45.913Z",
    "article_read_number"   : 0,
    "article_comment_number": 0,
    "article_content": ""
});

var articleEntity2 = new articleModel({
    "_id"                   : 2,
    "article_title"         : "相亲信息爬虫？",
    "article_sub_title"     : "下一个项目",
    "article_title_pic"     : "img/article/article_2_title.jpg",
    "article_author"        : "Kevin Song",
    "article_time"          : "2015-08-26T11:45:31.913Z",
    "article_read_number"   : 0,
    "article_comment_number": 0,
    "article_content": ""
});

var articleEntity3 = new articleModel({
    "_id"                   : 3,
    "article_title"         : "凌晨四点半",
	"article_sub_title"     : "最近一些感想",
    "article_title_pic"     : "img/article/article_3_title.jpg",
    "article_author"        : "Kevin Song",
    "article_time"          : "2015-09-02T10:08:25.913Z",
    "article_read_number"   : 0,
    "article_comment_number": 0,
    "article_content": ""
});


var articleEntity4 = new articleModel({
    "_id"                   : 4,
    "article_title"         : "over the way",
    "article_sub_title"     : "分享一首她的歌",
    "article_title_pic"     : "img/article/article_4_title.jpg",
    "article_author"        : "Kevin Song",
    "article_time"          : "2015-10-06T06:01:25.913Z",
    "article_read_number"   : 0,
    "article_comment_number": 0,
    "article_content": ""
});


var articleEntity5 = new articleModel({
    "_id"                   : 5,
    "article_title"         : "读书计划",
    "article_sub_title"     : "Just reading a little more",
    "article_title_pic"     : "img/article/article_5_title.jpg",
    "article_author"        : "Kevin Song",
    "article_time"          : "2015-11-20T10:25:25.913Z",
    "article_read_number"   : 0,
    "article_comment_number": 0,
    "article_content": ""
});

/*
var articleEntity6 = new articleModel({
    "_id"                   : 6,
    "article_title"         : "Kevin - Wikipedia, the free encyclopedia",
    "article_title_pic"     : "img/article_1_title.jpg",
    "article_author"        : "Kevin Song",
    "article_time"          : "2013-11-15T23:49:45.913Z",
    "article_read_number"   : 0,
    "article_comment_number": 0,
    "article_content": ""
});

var articleEntity7 = new articleModel({
    "_id"                   : 7,
    "article_title"         : "你们身边有没有很多英文名叫Kevin的？",
    "article_title_pic"     : "img/article_1_title.jpg",
    "article_author"        : "Kevin Song",
    "article_time"          : "2015-06-30T13:19:25.913Z",
    "article_read_number"   : 0,
    "article_comment_number": 0,
    "article_content": ""
});*/


// read the article content for entity
var articleContent1 = fs.readFileSync('../articles/article_1.html', 'utf-8');
var articleContent2 = fs.readFileSync('../articles/article_2.html', 'utf-8');
var articleContent3 = fs.readFileSync('../articles/article_3.html', 'utf-8');
var articleContent4 = fs.readFileSync('../articles/article_4.html', 'utf-8');
var articleContent5 = fs.readFileSync('../articles/article_5.html', 'utf-8');

// set the content
articleEntity1.article_content = articleContent1;
articleEntity2.article_content = articleContent2;
articleEntity3.article_content = articleContent3;
articleEntity4.article_content = articleContent4;
articleEntity5.article_content = articleContent5;
/*articleEntity6.article_content = articleContent;
articleEntity7.article_content = articleContent;*/

// set all data to array
var articleArray = [
    articleEntity1,
    articleEntity2,
    articleEntity3,
    articleEntity4,
    articleEntity5
    /*articleEntity6,
    articleEntity7*/
];

// insert data to db
articleModel.create(articleArray, function(err, data) {
    if (err) {
        console.log("Database Error: insert data to collection. Error: " + err);
    }
    else {
        //console.log("Database: insert data success. Article title: " + data.article_title);
        console.log("Database: insert data success.");
    }
});
