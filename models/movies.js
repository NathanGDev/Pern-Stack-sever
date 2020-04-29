module.exports = function (sequelize, DataTypes) {
  return sequelize.define("movie", {
    favorite: DataTypes.BOOLEAN,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    year: DataTypes.INTEGER,
    length: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    owner: DataTypes.INTEGER,
  });
};
