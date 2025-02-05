const express = require("express");
const cors = require("cors");
require("dotenv").config();
//* WEB SOCKET
const WebSocket = require("ws");

var path = require("path");

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "http://localhost:5173" }));
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

// Rutas
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

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Coffe Shop application" });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: true, message: "Algo salió mal en el servidor." });
});

//* WEB SOCKET
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "test") {
  // var server = new WebSocket.Server({ port: PORT }, () => {
  //   console.log(`Backend server running on port ${PORT} `);
  // });

  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT} `);
  });
  
} else {
  module.exports = app;
}
    
// const clients = [];
// const clientsWaiting = [];
// const clientsDone = [];

// function sendMessage(message) {
//   clientsWaiting.forEach((client) => {
//     client.ws.send(JSON.stringify(message));
//   })
// }

// server.on('connection', (ws, incoming_request) => {
//   const urlParsed = new url.URL(incoming_request.url, 'http://${incoming_request.headers.host}')
//   const pedido = {
//     userId: urlParsed.searchParams.get("userId"),
//     username: urlParsed.searchParams.get("userName"),
//     foodName: urlParsed.searchParams.get("foodName")
//   }

//   ws.userId = pedido.userId;
//   ws.username = pedido.username;
//   ws.foodName = pedido.foodName;

//   const userRef = { ws };

//   clients.push(pedido);
//   // Necesito esto?
//   clientsWaiting.push(userRef);

//   console.log("conexión creada");
//   console.log(clients);

//   sendMessage({
//     clients,
//     clientsDone
//   })

//   // mensaje recibido:
//   ws.on('message', (message) => {
//     try {
//       const data = JSON.parse(message);

//       if (typeof data.type !== 'string') {
//         console.error('invalid message, is not a string');
//         return;
//       }

//       //Student make an order
      

//       // Worker finish an order
//       if (data.type !== 'next') {
//         for (let i = 0; i < helps.length; i++) {
//           if (clientsDone[i].userId == data.userId && clientsDone[i].foodName == data.foodName) {
//             helps.splice(i, 1);
//           }
//         }
//       }
//     } catch (e) { console.error('Error pasing message!', e) }
//   })

//   ws.on('close', (code, reason) => {
//     console.log("final");
//     console.log(clients);
//   })
// })