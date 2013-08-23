var express = require('express');
var http = require('http');
var parser = require('./parser');
var path = require('path')

var app = module.exports = express();
app.use(express.logger());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use('/', express.static(path.join(__dirname, 'views')));
app.use('/lib', express.static(path.join(__dirname, 'public/js/lib')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

//routes
// redirect all others to the index (HTML5 history)
app.get('/rss', function(req, res) {
	parser.getXMLString(function (xmlString) {
		var list = parser.parseXMLString(xmlString);
		res.send(list);
	})
});
app.get('/', function(req, res) {
	res.render('index');
});

//init webserver
var PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Listening on " + PORT);
});