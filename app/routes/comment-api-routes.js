var db = require("../models");
// =============================================================

module.exports = function(app) {

  //GET route for getting all of the comments
  app.get("/api/comments", function(req, res) {
    // findAll returns all entries for a table when used with no options
    console.log("Working");
    db.comments.findAll({}).then(function(dbNews) {
      res.json(dbNews);
    });
  });

//optional delete feature
app.delete("/api/delete/:id", function(req, res) {
    db.commments.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbNews) {
      res.json(dbNews);
    });
  });

  app.post("/api/comments", function(req, res) {
    db.comments.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

};