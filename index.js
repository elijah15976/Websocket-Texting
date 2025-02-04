//Creating the actual server
const WebSocket = require('ws');
const server = new WebSocket.Server({port:'81'});

const http = require('http');
const fs = require('fs');

//HTTP Server
http.createServer(function (req, res) {
  console.log(req.url);
  if(req.url == "/script.js"){
    fs.readFile('script.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      return res.end();
    });
  }
  else if(req.url == "/style.css"){
    fs.readFile('style.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      return res.end();
    });
  }
  else{
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }
}).listen(80, "0.0.0.0");

//Websocket Server
server.on('connection', socket =>{
  server.broadcast(`People Online: ${server.clients.size - 1}`);
  //Listens to messages that is RECEIVED
  socket.on('message', message =>{
    server.broadcast(message);
  });
  //Detects when someone disconnects
  socket.on('close', () =>{
    server.broadcast("A user left");
  });
});

server.broadcast = (msg)=>{
  server.clients.forEach(function each(client) {
    client.send(msg.toString());
  });
}