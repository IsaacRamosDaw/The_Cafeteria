let WSServer = require("ws").Server;
let server = require("http").createServer();
const app = require("./http-server");

let wss = new WSServer({
  server: server,
});

const PORT = process.env.PORT || 8080;

server.on("request", app);

wss.on("connection", (ws) => {
  log("New client connected!", wss.clients.size);

  // wss.on("open", () => {
  //   ws.send("Hello client!");
  //   log("Connection open");
  // });

  ws.on("close", () => {
    log("Connection closed");
  });

  ws.on("message", (rawMessage) => {
    const msg = JSON.parse(rawMessage);

    log("Message received: ", msg);

    if (msg.type === "auth") {
      ws.userId = msg.data.userId;
      ws.userRole = msg.data.userRole;

      log("Cliente userId registered ", ws.userId);
      log("Cliente userRole registered ", ws.userRole);
    }

    ws.send(
      JSON.stringify({
        type: "chat",
        data: {
          message: "Mensaje recibido: ",
          msg,
        },
      })
    );

  });
});

const updateOrder = (orderId, userId) => {
  wss.clients.forEach((client) => {
    console.log("User in bucle: ", client);
    if (client.readyState === WebSocket.OPEN && client.userId === userId) {
      log("Cliente found: ", client);
      client.send(
        JSON.stringify({
          type: "notification",
          data: {
            orderId: orderId,
            status: "completed",
          },
        })
      );
    }
  });
};

function log(msg, obj) {
  console.log("\n");
  obj ? console.log(msg, obj) : console.log(msg);
  console.log("\n");
}

server.listen(PORT, function () {
  console.log(`http/ws server listening on ${PORT}`);
});

exports.updateOrder = updateOrder;
