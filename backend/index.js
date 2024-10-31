const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("drop and re-sync db");
});

app.get("/", (req, res) => {
  res.json({ message: "welcome to cafeteria application" });
});

// require("./routes/coffeShop.routes")(app);
require("./routes/categories.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

var corsOptions = {
  origin: "http://localhost:8100"
};

app.use(cors(corsOptions));
