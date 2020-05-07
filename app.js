require("dotenv").config();

const express = require("express");
const app = express();
const user = require("./controllers/usercontroller");
const DB = require("./db");
const bodyParser = require("body-parser");
const movie = require("./controllers/moviecontroller");

DB.sync();

app.use(bodyParser.json());

app.use(require("./middleware/headers"));

app.use("/api/user", user);

app.use(require("./middleware/validate-session"));

app.use("/api/movies", movie);

app.listen(process.env.PORT, function () {
  console.log("Server is running on port 1337");
});
