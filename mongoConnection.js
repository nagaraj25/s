var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
function getData(){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("local");
	  dbo.collection("startup_log").findOne({}, function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    db.close();
	  });
	});
}

function getData1(){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("stk");
	  dbo.collection("data").findOne({}, function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    db.close();
	  });
	});
}

getData1();

//getData();
//insertData();
function insertData(){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("stk");
	  var myobj = {
	"infosys":{"21-01-2010":{
		"price":12,
		"high":10,
		"low":9,
		"open":8,
		"close":7
	}}
};
	  dbo.collection("data").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
	});
}