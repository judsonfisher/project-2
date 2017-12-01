var db = require("../models");

module.exports = function(app) {

  app.get("/api/comments", function(req, res) {
    db.comments.findAll({}).then(function(dbNews) {
      res.json(dbNews);
    });
  });

app.delete("/api/comments/:id", function(req, res) {
    db.comments.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbNews) {
      res.json(dbNews);
    });
  });

  app.post("/api/comments", function(req, res) {
    db.comments.create(req.body).then(function(dbNews) {
      res.json(dbNews);
    });
  });

};