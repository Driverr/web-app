var express = require('express');
var http = require('http');
var gzippo = require('gzippo');
var path = require('path');

var app = express();
app.use(gzippo.staticGzip('' + __dirname + '/dist'));

app.use('/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

var server = http.createServer(app);
server.listen(process.env.PORT || 5000);
console.log("Server running on port: " + process.env.PORT || 5000);

