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

    // console.log("En medio: ", req.headers);
    // console.log(req.body);

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

//! Importante
// Jest ejecuta los test en paralelo, en decir en multiples instancias
// Esto hace que un mismo puerto sea usado en varios test
// Lo que lleva a error, por esto lo configure para que
// el servidor solo se encienda cuando ejecutas directamente
// index.js y no cuando lo importas en test

// if (require.main === module) {
//   const server = app.listen(PORT, () => {
//     console.log(`Backend server running on port ${PORT} `);
//   });

//   module.exports = server;
// } else {
//   module.exports = app;
// }

//* WEB SOCKET
if (require.main === module) {
  var server = new WebSocket.Server({port: PORT}, () => {
    console.log(`Backend server running on port ${PORT} `);
  });

  module.exports = server;
} else {
  module.exports = app;
}

const usersToSend = [];
const users = [];
const helps = [];

// Este código estaba al final del todo pero me parecía que tenía más lógica arriba
function sendMessage(message) {
  users.forEach((user) => {
    user.ws.send(JSON.stringify(message));
  })
}

server.on('connection', (ws, incoming_request) => {
  const u = { username: incoming_request.url.split("=")[1]};
  ws.username = u.username;
  const userRef = { ws };
  usersToSend.push(userRef)
  users.push(u);
  console.log("create");
  console.log(users);

  sendMessage({
    users,
    helps
  })

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      // Checking if the message is a valid one
      if (typeof data.type !== 'string') {
        console.error('Invalid message, is not string message');
        return;
      }

      if(data.type == 'ask for help'){
        helps.push({
          helper: data.helper,
          helped: data.helped,
          timeStamp: data.timestamps
        })
      };

      if(data.type == 'next please'){
        for (let i = 0; i < helps.length; i++) {
          if(helps[i].helper == data.helper && helps[i].helped == data.helped) {
            helps.splice(i,1);
          }
        }
      };

      sendMessage({users, helps});
    } catch (e) { console.error('Error pasing message!', e)}
  })

  ws.on('close', (code, reason) => {
    for (let i = 0; i < users.length; i++) {
      console.log(users[i]);
      if(users[i].username === ws.username){
        users.splice(i,1);
        usersToSend.splice(i,1);
      }
    }
    console.log("final");
    console.log(users);
  });

});

