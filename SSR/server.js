const express = require("express");

require("dotenv").config();

var path = require("path");

const app = express();

//public directory
app.use(express.static(path.join(__dirname, "public")));

// app.use(upload.single('file')); // Use form-data HTTP headers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use urlencoded HTTP headers

app.set('view engine', 'ejs');

const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db");
});

// require("./routes/coffeShop.routes")(app);
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
require('./routes/index.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on portaso ${PORT}`);
})

require('./routes/index.routes')(app);
