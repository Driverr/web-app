var gzippo = require('gzippo');
var morgan = require('morgan');
var express = require('express');

var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use('/assets', express.static(__dirname + "/app/assets"));
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.use('/css', express.static(__dirname + "/app/assets/css"));
app.use('/js', express.static(__dirname + "/app/assets/js"));
app.use('/img', express.static(__dirname + "/app/assets/img"));
app.use('/fonts', express.static(__dirname + "/app/assets/fonts"));
app.use('/views', express.static(__dirname + "/app/assets/views"))

app.listen(process.env.PORT || 5001);