var db = require("../models");

// =============================================================

module.exports = function(app) {

  //GET route for getting all of the todos
  app.get("/api/news", function(req, res) {
    // findAll returns all entries for a table when used with no options
    console.log("working")
    db.Articles.findAll({
      include: [] // data goes here
    }).then(function(dbNews) {
      res.json(dbNews);
    });
  });

  app.post("/api/news", function(req, res) {
    db.Articles.create({
      published: req.body.published,
      title: req.body.title,
      thread_title: req.body.threadTitle,
      main_img_url: req.body.imgURL
    }).then(function(dbNews) {
      res.json(dbNews);
    });
  });

};