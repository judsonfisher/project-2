var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./app/models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

require("./app/routes/html-routes.js")(app);
require("./app/routes/api-routes.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


// TO DO:
// - Create front end that can receive data from db
// - Create front end JS files that execute requests once buttons are clicked
// - Link HTML routes to those commands
// - Hardcode DB to app and talk to TAs when time to deploy