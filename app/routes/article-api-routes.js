var db = require("../models");
// =============================================================

module.exports = function(app) {

  //GET route for getting all of the todos
  app.get("/api/news", function(req, res) {
    // findAll returns all entries for a table when used with no options
    console.log("Working");
    db.articles.findAll({}).then(function(dbNews) {
      res.json(dbNews);
    });
  });

  app.post("/api/news", function(req, res) {
    db.articles.create({
      published: req.body.published,
      title: req.body.title,
      siteUrl: req.body.siteUrl
      threadTitle: req.body.threadTitle,
      mainImgUrl: req.body.mainImgUrl
    }).then(function(dbNews) {
      res.json(dbNews);
    });
  });

};