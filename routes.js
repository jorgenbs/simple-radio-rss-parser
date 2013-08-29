var parser = require('./parser');

//routes
// redirect all others to the index (HTML5 history)
exports.rss = function(req, res) {
	parser.getXMLString(function (xmlString) {
		var list = parser.parseXMLString(xmlString);
		res.send(list);
	})
};
exports.index = function(req, res) {
	res.render('index');
};
