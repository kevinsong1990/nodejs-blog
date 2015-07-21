var express = require('express');
var http    = require('http');
var path    = require('path');
var config  = require('./config.json');


var app = module.exports = express();

app.use(express.static(path.join(__dirname, 'public')));

// get port
var port = config.port;
console.log("Server listening on port: " + port);

// create server
http.createServer(app).listen(port);
