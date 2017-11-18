module.exports = function(sequelize, DataTypes) {
	var News = sequelize.define("News", {
		published: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1]
			}
		},
		title: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      validate: {
	        len: [1]
	      }
	    },
	    thread_title: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      validate: {
	        len: [1]
	      }
	    },
	    main_img_url: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      validate: {
	        len: [1]
	      }
	    }
	});

	return News;
};