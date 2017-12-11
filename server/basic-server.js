/* Import node's http module: */
var http = require('http');
var url = require('url');
var handleRequest = require('./request-handler.js');

var port = 3000;

var ip = '127.0.0.1';

// After creating the server, we will tell it to listen on the given port and IP. */
var server = http.createServer(handleRequest.requestHandler);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);

