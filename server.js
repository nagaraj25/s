var http = require('http');
var dt = require('./dateModule');
var url = require('url');
var fs = require('fs');
var csv=require('csvtojson');

http.createServer(function (req, res) {
	var data1 =[];
	function readWriteHtml(path){
		fs.readFile(path, function(err, data) {
		    data1.push(data);
	    });
	}

	function readWriteJson(){
		fs.readFile('data.json',function(err,data){
	  		res.write("Nagaraj"+"\n\n\n");
	  		res.write(data+"\n\n\n");
	  		res.write(JSON.parse(data).name);
	  		res.end();
  		});
	}

	function jsonWrite(){
		res.writeHead(200, {'Content-Type': 'application/json'});
		    res.write(data1);
		    res.end();
	}

	function urlHandling(){
		res.write(req.url+"\n");  //Prints full url URL : http://localhost:9999/Bala/?name=nagaraj&message=helloNagaraj  and out put : /Bala/?name=nagaraj&message=helloNagaraj
		var q = url.parse(req.url, true).query;
		res.write(q.name+":"+q.message);  //outPut: nagaraj:helloNagaraj
		res.write('Hello World!' + dt.getDateNow());
		res.end();
	}

	function listAllFiles(){
		const testFolder = './data';
		const fs = require('fs');

		fs.readdir(testFolder, (err, files) => {
		  files.forEach(file => {
		    console.log(file);
		    readWriteHtml('./data/'+file);
		  });
		  setTimeout(function(){
		  	jsonWrite();
		  	console.log("Read Write Done");
		  },2*60*1000);
		});
	}
	listAllFiles();

	function readCsvReturnJSON(){
		var csvFilePath="./data1.txt";
		csv().fromFile(csvFilePath).then((jsonObj)=>{
			    //console.log(jsonObj,"Nagaraj");
			    //return jsonObj;
			    urlHandling1(JSON.stringify(jsonObj)
			    	.replace(/\"<ticker>\":/g, "\"scrip\":")
			    	.replace(/\"<date>\":/g, "\"date\":")
			    	.replace(/\"<open>\":/g, "\"open\":")
			    	.replace(/\"<high>\":/g, "\"high\":")
			    	.replace(/\"<low>\":/g, "\"low\":")
			    	.replace(/\"<close>\":/g, "\"close\":")
			    	.replace(/\"<volume>\":/g, "\"volume\":")
			    	.replace(/\"<o\/i>\":/g, "\"ignore\":")
			    	);

			    /*var str="20150425";
				console.log(str.slice(0,4));
				var d = new Date(str.slice(0,4)+"-"+str.slice(4,6)+"-"+str.slice(6,8));*/
			})
			 
			// Async / await usage
			//const jsonArray=await csv().fromFile(csvFilePath);
	}

	function urlHandling1(data){
		//console.log(data);
		var d=JSON.parse(data);
		for(var i=0;i<d.length;i++){
			if(d[i].ignore !== undefined && d[i].scrip !=="NSENIFTY"){
				console.log(d[i]);
			}
		}
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(data);
		res.end();
	}

	//readCsvReturnJSON();
	//urlHandling1();
  	//readWriteHtml();
  	//readWriteJson();
  	//urlHandling();
  	//listAllFiles();
}).listen(9999);