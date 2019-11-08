require("./config/config");
// Using Node.js `require()`
const mongoose = require("mongoose");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use(require("./routes/usuario"));

// Mongoose Connections
mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err, res) => {
    if (err) throw err;

    console.log("Base de datos online");
  }
);

app.listen(process.env.PORT, () => {
  console.log("Escuchando en puerto", 3000);
});
