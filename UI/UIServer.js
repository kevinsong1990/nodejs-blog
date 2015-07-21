var express = require('express');
var http    = require('http');
var path    = require('path');
var routes  = require('./routes/index');
var config  = require('./config.json');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// get port
var port = config.port;
console.log("Server listening on port: " + port);

// create server
http.createServer(app).listen(port);

