var fs = require('fs');
var csv=require('csvtojson');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function listAllFiles(){
		const testFolder = './data';
		const fs = require('fs');

		fs.readdir(testFolder, (err, files) => {
		  files.forEach(file => {
		    readCsvReturnJSON(file);
		  });
		});
	}

listAllFiles();

//readCsvReturnJSON("2015-01-01-NSE-EQ.txt");

function readCsvReturnJSON(csvFilePath){
		//var csvFilePath="./data/2015-01-01-NSE-EQ.txt";
		csv().fromFile("./data/"+csvFilePath).then((jsonObj)=>{
			    processData(JSON.stringify(jsonObj)
			    	.replace(/\"<ticker>\":/g, "\"scrip\":")
			    	.replace(/\"<date>\":/g, "\"date\":")
			    	.replace(/\"<open>\":/g, "\"open\":")
			    	.replace(/\"<high>\":/g, "\"high\":")
			    	.replace(/\"<low>\":/g, "\"low\":")
			    	.replace(/\"<close>\":/g, "\"close\":")
			    	.replace(/\"<volume>\":/g, "\"volume\":")
			    	.replace(/\"<o\/i>\":/g, "\"ignore\":")
			    	);
			})
	}

function processData(d){
	var a = [];
	a = JSON.parse(d);
	for(var i=0;i<a.length;i++){
			var str=a[i].date;
			a[i].date = str.slice(0,4)+"-"+str.slice(4,6)+"-"+str.slice(6,8);
	}
	insertIntoMongo(a);
}

function insertIntoMongo(data){
	MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("data");
	  dbo.collection("datac").insertMany(data, function(err, res) {
	    if (err) throw err;
	    console.log("document inserted");
	    db.close();
	  });
	});
}

//readCsvReturnJSON();