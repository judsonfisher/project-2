module.exports = function(sequelize, DataTypes) {
  
  var comments = sequelize.define("comments", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  return comments;
};