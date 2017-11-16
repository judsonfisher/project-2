var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/articles", function(req, res) {
    // findAll returns all entries for a table when used with no options
    var query = {};
    if (req.query.title) {
      query.titleSearched = req.query.title;
    }
    db.todo.findAll({
      where: query,
    }).then(function(dbNews) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbNews);
    });
  });

  // POST route for saving a new todo
  app.post("/api/articles", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.todo.create({
      published: req.body.published,
      title: req.body.title,
      thread_title: req.body.threadTitle,
      main_img_url: req.body.imgURL
    }).then(function(dbNews) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbNews);
    });
  });

};