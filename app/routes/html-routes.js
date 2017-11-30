

  app.get("/", function(req, res) {
  });

  app.get("/results", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
  });

};