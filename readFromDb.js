var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var url = "mongodb://localhost:27017/";

//create a server object:
http.createServer(function (req, res) {
	MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db1) {
		var dbo = db1.db("data");
		dbo.collection("datac").find({"scrip":"INFY"}).toArray(function(err, result) {
			result.forEach(function(err,da){
				res.write(JSON.stringify(result[da]));
			});
		});
	  });
}).listen(8088);