let WSServer = require("ws").Server;
let server = require("http").createServer();
let app = require("./http-server");

let wss = new WSServer({
  server: server,
});

const PORT = process.env.PORT || 8080;

server.on("request", app);

const clientsWaiting = [];

wss.on("connection", (ws, incoming_request) => {
  // const urlParsed = new url.URL(incoming_request.url, 'http://${incoming_request.headers.host}')

  console.log(
    "---------------------------------------------------------------------------"
  );
  console.log("User conected: ", ws);

  ws.send(" Hello client")

  // const pedido = {
  //   userId: urlParsed.searchParams.get("userId"),
  //   foodName: urlParsed.searchParams.get("foodName")
  // }

  // ws.userId = pedido.userId;
  // ws.foodName = pedido.foodName;

  // const userRef = { ws };

  // clientsWaiting.push(userRef);
  // console.log("conexión creada");

  wss.on("close", (code, reason) => {
    // for (let i = 0; i < clientsWaiting.length; i++) {
    //   console.log(clientsWaiting[i]);
    //   if (clientsWaiting[i].userId == ws.userId && clientsWaiting.foodName == ws.foodName) {
    //     clientsWaiting.splice(i, 1);
    //     break;
    //   }
    // }X

    console.log(
      "---------------------------------------------------------------------------"
    );

    console.log("Se ha cerrado la conexion del usuario" + ws);
  });
});

const sendMessage = (userId, message) => {
  for (let i = 0; i < clientsWaiting.length; i++) {
    if (clientsWaiting.ws.userId === userId) {
      clientsWaiting.ws.send(message);
      console.log(`Mensaje enviado al usuario ${userId}`);
    }
  }
};

server.listen(PORT, function () {
  console.log(`http/ws server listening on ${PORT}`);
});

module.exports = sendMessage;
