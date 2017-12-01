// ALL OF THIS NEEDS WORK
$(document).ready(function() {

  var date = new Date();
  console.log(date);

  var year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var dayOfWeek = weekday[date.getDay()];
  var dd = date.getDate();
  var mm = date.getMonth();
  var month = year[mm];
  var yyyy = date.getFullYear();
  var today = dayOfWeek + " " + month + " " + dd + ", " + yyyy;

  $("#date").append(today);

  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Austin&appid=06d6c31b83f9078a12ddaaacec809ab3";

  $.ajax({
      url: queryURL,
      method: "GET",
    })
    .done(function(response) {
      console.log(response);

      var currentKelvin = response.main.temp;
      var highKelvin = response.main.temp_max;
      var lowKelvin = response.main.temp_min;
      var currentTemp = ((9/5) * (currentKelvin - 273)) + 32;
      var currentTempRounded = Math.round(currentTemp);

      var cloudiness = response.weather[0].description;

      var icon = response.weather[0].icon;
      var iconLink = ("http://openweathermap.org/img/w/" + icon + ".png");
      console.log(iconLink);

      var highTemp = ((9/5) * (highKelvin - 273)) + 32;
      var highTempRounded = Math.round(highTemp);
      var lowTemp = ((9/5) * (lowKelvin - 273)) + 32;
      var lowTempRounded = Math.round(lowTemp);

      var sunrise = response.sys.sunrise;
      var sunriseDate = new Date(1000 * sunrise);
      var sunriseTime = sunriseDate.toLocaleTimeString();

      var sunset = response.sys.sunset;
      var sunsetDate = new Date(1000 * sunset);
      var sunsetTime = sunsetDate.toLocaleTimeString();

      var humidity = response.main.humidity;

      var windSpeed = response.wind.speed;

      var visibility = response.visibility;
      var visibilityMiles = visibility * 0.000568;
      var visibilityRounded = visibilityMiles.toFixed(2);

      $("#temp").append(currentTempRounded + "°F");
      $("#cloudiness").append(cloudiness);
      $("#icon").append("<img src=" + iconLink + ">");
      $("#high").append("High<br>" + highTempRounded + "°F");
      $("#low").append("Low<br>" + lowTempRounded + "°F");
      $("#sunrise").append("Sunrise: " + sunriseTime);
      $("#sunset").append("Sunset: " + sunsetTime);
      $("#humidity").append("Humidity: " + humidity + "%");
      $("#windSpeed").append("Wind: " + windSpeed + " mph");
      $("#visibility").append("Visibility: " + visibilityRounded + " mi");
  });

  $(".page-title").on("click", function() {
    window.location.href = "/"
  }); 

  // END OF HOME PAGE AJAX CALL

  // ==========================================================================

  // Begin routing calls

  var nameInput = $("#firstName");
  var commentInput = $("#comment");
  var commentForm = $("#commenting");
  var commentSection = $(".comments");
  var updating = false;
  var comments;
  var commentId;
  
  showComments();

  $(commentForm).on("submit", handleFormSubmit);
  $(document).on("click", ".delete-button", handleCommentDelete);

  function showComments() {
     $.get("/api/comments", function(data) {
      comments = data;
      initializeRows();
    });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!commentInput.val().trim() || !nameInput.val().trim()) {
      return;
    }

    var newComment = {
      name: nameInput
        .val()
        .trim(),
      body: commentInput
        .val()
        .trim(),
    };

    $("#firstName").val("");
    $("#comment").val("");

    if (updating) {
      newComment.id = commentId;
      updateComment(newComment);
    }
    else {
      submitComment(newComment);
    }
  };

  function submitComment(post) {
    $.post("/api/comments", post, function() {
      window.location.href = "/article";
    });
  };  

  function initializeRows() {
    var commentsToAdd = [];
    for (var i = 0; i < comments.length; i++) {
      commentsToAdd.push(createNewRow(comments[i]));
    }
    commentSection.append(commentsToAdd);
  }

  function createNewRow(comments) {
    console.log("Creating rows")

    var newRow = $("<div>");
    newRow.addClass("row");
    var newCommentData = $("<div>");
    newCommentData.addClass("comment-section col s8 offset-s2");
    var userName = $("<p>");
    userName.addClass("user-name");
    var userComment = $("<p>");
    userComment.addClass("user-comment");
    var removeThis = $("<button>");
    removeThis.addClass("delete-button");
    removeThis.text("X");
    var gap = $("<br>")
    var gap2 = $("<br>")

    userName.text(comments.name);
    userComment.text(comments.body + "  ");

    newRow.append(newCommentData);
    newCommentData.append(userName);
    userName.append(userComment);
    userComment.append(removeThis);

    newRow.data("comments", comments);

    return newRow
  };

  function handleCommentDelete() {
    event.preventDefault();
    var currentComment = $(this).parent().parent().parent().parent().data("comments");
    console.log(currentComment);
    deleteComment(currentComment.id);
  };

  function deleteComment(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + id
    })
    .done(function() {
      window.location.href = "/article";
    });
  };


  });
