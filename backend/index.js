const jwt = require('jsonwebtoken');
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db");
});

app.use(function (req, res, next){
  var token= req.headers['authorization'];
  if (!token) return next();

  if(req.headers.authorization.indexOf('Basic ') === 0){

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    req.body.username = username;
    req.body.password = password;
    
    return next();
  }

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function(err, user){
    if(err){
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else{
      req.user = user;
      req.token = token;
      next();
    }
  });
});

app.get("/", (req, res) => {
  res.json({ message: "welcome to cafeteria application" });
});

require("./routes/coffeShop.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/worker.routes")(app);
require("./routes/school.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
