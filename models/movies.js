module.exports = function (sequelize, DataTypes) {
  return sequelize.define("movie", {
    favorite: DataTypes.BOOLEAN,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    year: DataTypes.STRING,
    poster: DataTypes.STRING,
    rating: DataTypes.STRING,
    owner: DataTypes.INTEGER,
  });
};
