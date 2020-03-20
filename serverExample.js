var http = require('http');
//nagaraj
//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8181); //the server object listens on port 8080
