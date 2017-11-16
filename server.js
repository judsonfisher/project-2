var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./app/models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
    db.all(function(data) {
      var hbsObject = {
        db: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});