const { kMaxLength } = require('node:buffer');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const server = http.createServer();

const sendResponse = function(response) {
  response.writeHead(response.statusCode, {
    'Content-Type': response.contentType,
    'Content-Length': response.content.length
  });
  response.write(response.content, () => {
    response.end();
  });
}

server.on('request', (request, response) => {

  response.content       = Buffer.from('');
  response.statusCode    = 200;
  response.contentType   = 'text/html;charset=utf8';




  sendResponse(response);
})

server.listen(80, () => {
  console.log('Server started on port 80');
})