const express = require("express");
const app = express();
const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db");
});

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on portaso ${PORT}`);
})

require('./routes/index.routes')(app);