var express = require('express');
//var http = require('http');
//var gzippo = require('gzippo');
//var path = require('path');

var app = express();
//app.use(gzippo.staticGzip('' + __dirname + '/dist'));

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
	res.sendFile('app/index.html');
});

//var server = http.createServer(app);
//server.listen(process.env.PORT || 9000);
//console.log("Server running on port: " + process.env.PORT || 9000);

app.listen(9000);
console.log("Express listening on: " + 9000);
