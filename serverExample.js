var http = require('http');
//nagaraj S
//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(process.env.PORT || 8181); //the server object listens on port 8080
