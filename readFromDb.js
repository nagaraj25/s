var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var url = "mongodb://localhost:27017/";

function getData1(){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("stk");
	  dbo.collection("data").findOne({"scrip":"INFY"}, function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    //var fs = require('fs');
	    //const JSON = require('circular-json');
		//fs.writeFile('myjsonfile.json', JSON.stringify(result), 'utf8', callback);
	    db.close();
	  });
	});
}

function callback(){

}

getData1();