module.exports = function (sequelize, DataTypes) {
  return sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  });
};
