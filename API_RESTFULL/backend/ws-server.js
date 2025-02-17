let WSServer = require("ws").Server;
let server = require("http").createServer();
let app = require("./http-server");

let wss = new WSServer({
  server: server,
});

const PORT = process.env.PORT || 8080;

server.on("request", app);

wss.on("connection", (ws) => {
  console.log("New client connected!");

  ws.on("open", () => {
    ws.send("Hello client!");
    console.log("Connection open");
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });

  ws.on("message", (msg, isBinary) => {
    console.log('Message received: ', msg.toString())

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(msg, { binary: isBinary });
    });
  });
});

server.listen(PORT, function () {
  console.log(`http/ws server listening on ${PORT}`);
});
