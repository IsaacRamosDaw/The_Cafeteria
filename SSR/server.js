const express = require("express");
require("dotenv").config();

var path = require("path");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Views directory
app.set("views", path.join(__dirname, "views"));

//public directory
app.use(express.static(path.join(__dirname, "public")));

const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db");
});

// Synchronize session store with db
db.sessionStore.sync();

// Session middleware
app.use(
  db.session({
    secret: process.env.SESSION_SECRET,
    store: db.sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// app.use(function (req, res, next) {
  
//   var token = req.headers["authorization"];
//   if (!token) return next();

//   if (req.headers.authorization.indexOf("Basic ") === 0) {
    
//     const base64Credentials = req.headers.authorization.split(" ")[1];
//     const credentials = Buffer.from(base64Credentials, "base64").toString(
//       "ascii"
//     );
//     const [username, password] = credentials.split(":");

//     req.body.username = username;
//     req.body.password = password;

//     return next();
//   }

//   token = token.replace("Bearer ", "");
//   jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//     if (err) {
//       return res.status(401).json({
//         error: true,
//         message: "Invalid user.",
//       });
//     } else {
//       req.user = user;
//       req.token = token;
//       next();
//     }
//   });
// });

require("./routes/coffeShop.routes")(app);
require("./routes/coffeShopViews.routes")(app);
require("./routes/admin.routes")(app);
require('./routes/admin.views.routes')(app)
require("./routes/worker.routes")(app);
require("./routes/worker.views.routes")(app);
require("./routes/student.views.routes")(app);
require("./routes/student.routes")(app);
require("./routes/school.routes")(app);
require("./routes/categories.routes")(app);
require("./routes/product.routes")(app);
require("./routes/productViews.routes")(app);
require("./routes/course.routes")(app);
require("./routes/order.routes")(app);
require("./routes/wallet.routes")(app);
require("./routes/site.routes")(app);

app.get('/', (req, res) => res.redirect("/admin"))

app.use((req, res) => {
  return res.render("error", {message: "Page not Found"});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on portaso ${PORT}`);
});
