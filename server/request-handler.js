/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

storeData = {
  results: [ ]
};

var requestHandler = function(request, response) {

  var headers = defaultCorsHeaders;
  

  // See the note below about CORS headers.
  headers['Content-Type'] = 'text/json';

  if (request.url !== '/classes/messages') {
    response.writeHead(404, defaultCorsHeaders);
    response.end();
  }
  
  if (request.method === 'DELETE') {
    storeData.results = [];
  }

  if (request.method === 'POST') {

    response.writeHead(201, defaultCorsHeaders);
    
    request.on('data', function(data) {
      console.log('in RH', data);
      storeData.results.push(JSON.parse(data.toString('utf8')));
    });
    
    
    response.end(storeData.toString('utf8').results);

  } else if (request.method === 'GET') {
    response.writeHead(200, defaultCorsHeaders);
    
    response.end(JSON.stringify(storeData));

  }

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

};



module.exports.requestHandler = requestHandler;
