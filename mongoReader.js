var http = require('http');
var URL = require('url');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
http.createServer(function (req, res) {
function getData(){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("data");
	  var q = URL.parse(req.url, true).query;
	  dbo.collection("datac").find({scrip:q.scrip}).sort({datefield: -1}).toArray(function(err, result) {
	    if (err) throw err;
	    res.writeHead(200, {'Content-Type': 'application/json'});
		    res.write(JSON.stringify(result));
		    res.end();
	    //console.log(result);
	    db.close();
	  });
	});
}

//http://localhost:9999/?scrip=INFY

getData();

}).listen(9999);