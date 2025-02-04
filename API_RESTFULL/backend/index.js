const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
//* WEB SOCKET
const WebSocket = require("ws");

var path = require("path");

const app = express();

//public directory
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use urlencoded HTTP headers

var corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

const db = require("./models");
const { timeStamp } = require("console");

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db");
// });

app.use(function (req, res, next) {
  var token = req.headers["authorization"];
  if (!token) return next();

  if (req.headers.authorization.indexOf("Basic ") === 0) {
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    // console.log("Decodificacion base64", username, password)

    req.body.username = username;
    req.body.password = password;

    return next();
  }

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user;
      req.token = token;
      next();
    }
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Coffe Shop application" });
});

require("./routes/coffeShop.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/worker.routes")(app);
require("./routes/student.routes")(app);
require("./routes/school.routes")(app);
require("./routes/categories.routes")(app);
require("./routes/product.routes")(app);
require("./routes/course.routes")(app);
require("./routes/order.routes")(app);
require("./routes/wallet.routes")(app);
require("./routes/site.routes")(app);

const PORT = process.env.PORT || 8080;

//* WEB SOCKET
if (process.env.NODE_ENV !== "test") {
  var server = new WebSocket.Server({ port: PORT }, () => {
    console.log(`Backend server running on port ${PORT} `);
  });

} else {
  module.exports = app;
}

const clientsWaiting = [];

server.on('connection', (ws, incoming_request) => {
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
  })
})
