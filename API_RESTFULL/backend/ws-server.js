let WSServer = require("ws").Server;
let server = require("http").createServer();
let app = require("./http-server");

let wss = new WSServer({
  server: server,
});

const PORT = process.env.PORT || 8080;

server.on("request", app);

wss.on("connection", (ws) => {
  log("New client connected!");

  wss.on("open", () => {
    ws.send("Hello client!");
    log("Connection open");
  });

  ws.on("close", () => {
    log("Connection closed");
  });

  ws.on("message", (rawMessage) => {
    const msg = JSON.parse(rawMessage);

    log("Message received: ", msg);

    ws.send(
      JSON.stringify({
        type: "chat",
        data: {
          message: "Mensaje recibido: ",
          msg,
        },
      })
    );

    // let data = JSON.parse(msg.toString());

    // log('Data parsed: ', data)

    // if (data.action === "init") {
    //   ws.userId = data.userId;
    //   ws.userRole = data.userRole;
    //   log("User registered: ", ws.userId, ws.userRole)
    // } else {
    //   log("Message received: ", msg.toString());
    // }

    // wss.clients.forEach((client) => {
    //   if (client.readyState == WebSocket.OPEN && client.userId === data.userId) {
    //     client.send("You have id: ", data.userId);
    //   }
    // });
  });
});

function updateOrder(orderId, userId) {
  wss.clients.forEach((client) => {
    if (client.readyState == WebSocket.OPEN && client.userId === userId) {
      client.send({
        type: "notification",
        data: {
          orderId: orderId,
          status: "completed",
        },
      });
    }
  });
}

function log(msg, obj) {
  console.log("\n");
  obj ? console.log(msg, obj) : console.log(msg);
  console.log("\n");
}

server.listen(PORT, function () {
  console.log(`http/ws server listening on ${PORT}`);
});

module.exports = updateOrder;
