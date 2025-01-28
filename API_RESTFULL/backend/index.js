const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

var path = require("path");

const upload = require("./multer/upload");

const app = express();

//public directory
app.use(express.static(path.join(__dirname, "public")));

// app.use(upload.single('file')); // Use form-data HTTP headers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use urlencoded HTTP headers

var corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db");
});

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
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
