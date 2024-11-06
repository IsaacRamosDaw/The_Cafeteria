const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("drop and re-sync db");
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
