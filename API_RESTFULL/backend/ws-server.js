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

    if (msg.type === "notification") {
      log("Notification received: ", msg);
      ws.send( JSON.stringify(msg) )
      
    }

    if (msg.type === "auth") {
      log("Auth message received: ", msg);
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
    if (client.readyState === WebSocket.OPEN && client.userId === userId) {
      client.send(
        JSON.stringify({
          type: "notification",
          data: {
            notificationType: "orderUpdate",
            orderId: orderId,
            status: "completed",
            timeStamps: Date.toString()
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


if( process.env.NODE_ENV =='development'  ){
  server.listen(PORT, function () {
    console.log(`http/ws server listening on ${PORT}`);
  });
}else{
  module.exports = server
}

exports.updateOrder = updateOrder;
