const express = require("express");
const cors = require("cors");
require("dotenv").config();

var path = require("path");

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

// const db = require('./models')

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
require("./routes/orderLine.routes")(app);
require("./routes/wallet.routes")(app);
require("./routes/site.routes")(app);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Coffe Shop application" });
});

// Middleware de manejo de errores
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: true, message: "Algo salió mal en el servidor." });
// });

module.exports = app;
