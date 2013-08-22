var xmljs = require("libxmljs");
var http = require("http");

//-- logger object list of items
exports.parseXMLString = function (xml) {
    var doc = xmljs.parseXmlString(xml);
    var items = [];

    doc.find('///item').forEach(function (i) {
        var newItem = {};
        try {
            newItem.title = i.get('title').text();
            newItem.url = i.get('enclosure').attr('url').value(),
			newItem.date = i.get('pubDate').text()
        } catch (e) {
            console.log('ERROR: unable to parse attribute');
        }

        if (Object.keys(newItem).length > 0) items.push(newItem);
    });

    return items;
};

//-- gets raw XML string from url. 
//-- when finished calls callback function with the data
exports.getXMLString = function (callback) {
    var options = {
        host: "podkast.nrk.no",
        port: 80,
        path: "/program/radioresepsjonen.rss",
        method: "GET"
    };
    var xml = '';

    var req = http.get(options, function (res) {
        res.setEncoding('utf8');

        res.on("data", function (data) {
            xml += data.toString();
        });

        res.on("end", function (e) {
            console.log('http end');
            console.log(e);
            callback(xml);
        });
    }).on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });

    return this;
}