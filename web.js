var express = require('express');
var http = require('http');
var path = require('path')
var routes = require('./routes')

var app = module.exports = express();
app.use(express.logger());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use('/lib', express.static(path.join(__dirname, 'public/js/lib')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

//routes
app.get('/', routes.index);
app.get('/rss', routes.rss);

//init webserver
var PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Listening on " + PORT);
});