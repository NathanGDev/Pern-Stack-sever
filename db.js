const Sequelize = require("sequelize");

const sequelize = new Sequelize("MovieDB", "postgres", "kaelonwut123", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to MoviesDB postgres database!");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
