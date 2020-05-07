require("dotenv").config();

const jwt = require("jsonwebtoken");
const sequelize = require("../db");
const User = sequelize.import("../models/user.js");

module.exports = (req, res, next) => {
  if (req.method == "OPTIONS") {
    next();
  } else {
    let sessionToken = req.headers.authorization;
    console.log(sessionToken);
    if (!sessionToken)
      return res.status(403).send({
        auth: true,
        message: "No token provided",
      });
    else {
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded) {
          User.findOne({
            where: {
              id: decoded.id,
            },
          }).then(
            (user) => {
              req.user = user;
              next();
            },
            () => {
              res.status(401).send({
                error: "No Authorization",
              });
            }
          );
        } else {
          res.status(400).send({
            error: "not Authorized",
          });
        }
      });
    }
  }
};
