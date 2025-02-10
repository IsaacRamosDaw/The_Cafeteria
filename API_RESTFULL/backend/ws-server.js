let WSServer = require('ws').Server;
let server = require('http').createServer();
let app = require('./http-server');

let wss = new WSServer({
  server: server
});

const PORT = process.env.PORT || 8080;

server.on('request', app);

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

  wss.on('message', (message) => {
    const data = JSON.parse(message)

    if (typeof data.type !== 'string') {
      console.error("invalid message");
      return;
    }

    if (data.type === "Finished") {
      for (let i = 0; i < clientsWaiting.length; i++) {
        if (clientsWaiting[i].userId == ws.userId && clientsWaiting.foodName == ws.foodName) {
          clientsWaiting.splice(i, 1);
          break;
        }
      }
    }
  })

  wss.on('close', (code, reason) => {
    for (let i = 0; i < clientsWaiting.length; i++) {
      console.log(clientsWaiting[i]);
      if (clientsWaiting[i].userId == ws.userId && clientsWaiting.foodName == ws.foodName) {
        clientsWaiting.splice(i, 1);
        break;
      }
    }

    console.log("Se ha cerrado la conexion del usuario" + ws.userId);
  })
})

const sendMessage = (userId, message) => {
  for (let i = 0; i < clientsWaiting.length; i++) {
    if (clientsWaiting.ws.userId === userId) {
      if (message == "") {
        clientsWaiting.ws.send("Tu pedido está en proceso");
      }
      clientsWaiting.ws.send(message);
    }
  }
}

server.listen(PORT, function () {
  console.log(`http/ws server listening on ${PORT}`);
});

module.exports = sendMessage;
