module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
	var Articles = sequelize.define("articles", {
=======
	var Articles = sequelize.define("News", {
>>>>>>> master
		published: {
			type: DataTypes.STRING,
			allowNull: true,
			// validate: {
			// 	len: [1]
			// }
		},
		title: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      // validate: {
	      //   len: [1]
	      // }
	    },
	    siteUrl: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      // validate: {
	      //   len: [1]
	      // }
	    },
	    threadTitle: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      // validate: {
	      //   len: [1]
	      // }
	    },
	    mainImgUrl: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      // validate: {
	      //   len: [1]
	      // }
	    },
	    //  comments : {
	    //   type: DataTypes.STRING,
	    //   allowNull: false,
	    //   // validate: {
	    //   //   len: [1]
	    //   // }
	    // }
	});

	return Articles;
};