let WSServer = require('ws').Server;
let server = require('http').createServer();
let app = require('./http-server');

let wss = new WSServer({
  server: server
});

//* WEB SOCKET
// const WebSocket = require("ws");
const PORT = process.env.PORT || 8080;

// if (process.env.NODE_ENV !== "test") {
//   var server = new WebSocket.Server({ port: PORT }, () => {
//     console.log(`Backend server running on port ${PORT} `);
//   });
  
// } else {
//   module.exports = app;
// }

server.on('request', app); 

const clients = [];
const clientsWaiting = [];

wss.on('connection', (ws, incoming_request) => {
  const urlParsed = new url.URL(incoming_request.url, 'http://${incoming_request.headers.host}')

  const pedido = {
    userId: urlParsed.searchParams.get("userId"),
    foodName: urlParsed.searchParams.get("foodName")
  }

  ws.userId = pedido.userId;
  ws.foodName = pedido.foodName;

  const userRef = { ws };

  clientsWaiting.push(userRef);
  console.log("conexión creada");
  console.log(clients);

  ws.on('close', (code, reason) => {
    const message = `Tu comida ${ws.foodName}" está lista.`

    for (let i = 0; i < clientsWaiting.length; i++) {
      console.log(clientsWaiting[i]);
      if (clientsWaiting[i].userId == ws.userId && clientsWaiting.foodName == ws.foodName) {
        clientsWaiting.splice(i, 1);
        break;
      }
    }

    for (let i = 0; i < clientsWaiting.length; i++) {
      if (clientsWaiting.ws.userId === ws.userId) {
        clientsWaiting.ws.send(message); // Enviar mensaje
        console.log(`Mensaje enviado al usuario ${ws.userId}`);
      }
    }
    console.log("Se ha cerrado la conexion del usuario" + ws.userId);
    // COMMIT
  })
})

server.listen(PORT, function() {
  console.log(`http/ws server listening on ${PORT}`);
});