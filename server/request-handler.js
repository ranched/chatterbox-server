/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

storeData = {
  results: [ ]
};

var requestHandler = function(request, response) {

  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/json';

  if (request.method === 'POST') {
  
    request.on('data', function(data) {
      storeData.results.push(data);
    });

    response.writeHead(201, defaultCorsHeaders);
    response.end(storeData.results);

  } else {

    if(request.url !== '/classes/messages') {
      console.log("message");

      request.on('end', function(data) {
        response.writeHead(404, defaultCorsHeaders);
        response.end(storeData.results);  
      });
    }

    response.writeHead(200, defaultCorsHeaders);

    response.end(JSON.stringify(storeData));
  }

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

};

module.exports.requestHandler = requestHandler;
