const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const Movie = sequelize.import("../models/movies");
const User = sequelize.import("../models/user.js");

router.post("/createfav", function (req, res) {
  let name = req.body.movie.name;
  let year = req.body.movie.year;
  let length = req.body.movie.length;
  let favorite = req.body.movie.favorite;

  let owner = req.user.id;

  Movie.create({
    favorite: favorite,
    name: name,
    year: year,
    length: length,
    owner: owner,
  }).then(
    (createMovie = (data) => {
      res.json({
        movies: data,
        message: "created movie in favorites",
      });
    }),
    (createError = (err) => {
      res.send(500, err.message);
    })
  );
});
// grab all the information in the database from the movies table.
router.get("/getfavs", (req, res) => {
  Movie.findAll({
    where: { owner: req.user.id },
  }).then(
    (findMovie = (data) => {
      res.json({ movie: data });
    }),
    (createError = (err) => {
      res.send(500, err.message);
    })
  );
});

router.put("/update/:id", (req, res) => {
  let data = req.params.id;
  let owner = req.user.id;

  let favorite = req.body.movie.favorite;
  let name = req.body.movie.name;
  let year = req.body.movie.year;
  let length = req.body.movie.length;

  Movie.update(
    {
      favorite: favorite,
      name: name,
      year: year,
      length: length,
    },
    {
      where: {
        id: data,
        owner: owner,
      },
    }
  ).then(
    (updateMovie = (update) => {
      res.status(200).json({ update: update });
    }),
    (updateError = (err) => {
      res.send(500, err.message);
    })
  );
});
// commented out the info the user IDs
router.delete("/delete/:id", (req, res) => {
  let data = req.params.id;
  let owner = req.user.id;

  Movie.destroy({
    where: {
      id: data,
      owner: owner,
    },
  }).then(
    (deleteLogSuccess = () => {
      res.send("you removed an item");
    }),
    (deleteLogError = (err) => {
      res.send(500, err.message);
    })
  );
});

module.exports = router;
