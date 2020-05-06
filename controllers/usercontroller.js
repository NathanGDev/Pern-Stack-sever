const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const User = sequelize.import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", function (req, res) {
  let username = req.body.user.username;
  let password = req.body.user.password;
  let firstName = req.body.user.firstName;
  let lastName = req.body.user.lastName;

  User.create({
    username: username,
    password: bcrypt.hashSync(password, 10),
    firstName: firstName,
    lastName: lastName,
  }).then(
    (createSuccess = (user) => {
      console.log(user);
      var token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      res.json({
        user: user,
        message: `${user.username} signed up successfully.`,
        sessionToken: token,
      });
    }),
    (createError = (err) => {
      res.status(500).send(err.message);
    })
  );
});

router.post("/login", function (req, res) {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  }).then(
    function (user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, function (
          err,
          matches
        ) {
          if (matches) {
            var token = jwt.sign(
              {
                id: user.id,
              },
              process.env.JWT_SECRET
            );
            res.json({
              user: user,
              message: `successfully authenticated ${user.username}`,
              sessionToken: token,
            });
          } else {
            res.status(502).send({
              error: "username or password is not correct",
            });
          }
        });
      } else {
        res.status(500).send({
          error: "username is not in use",
        });
      }
    },
    function (err) {
      res.status(501).send({
        error: "Unknown error has occured",
      });
    }
  );
});

module.exports = router;
