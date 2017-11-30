module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("comments", {
    article: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Comment.belongsTo(models.Articles, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};