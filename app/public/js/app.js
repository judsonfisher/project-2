// ALL OF THIS NEEDS WORK
$(document).ready(function() {


  var date = new Date();
  console.log(date);

  var year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var dayOfWeek = weekday[date.getDay()];
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
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
      $("#icon").append("<img src=" + iconLink + "/>");
      $("#high").append("High<br>" + highTempRounded + "°F");
      $("#low").append("Low<br>" + lowTempRounded + "°F");
      $("#sunrise").append("Sunrise: " + sunriseTime);
      $("#sunset").append("Sunset: " + sunsetTime);
      $("#humidity").append("Humidity: " + humidity + "%");
      $("#windSpeed").append("Wind: " + windSpeed + " mph");
      $("#visibility").append("Visibility: " + visibilityRounded + " mi");


      

  });


  // END OF HOME PAGE AJAX CALL

 var resultContainer = $(".result-container");
 var search = $("#search");
 
 // Need click/submit buttons	
 $(document).on("submit", "#news-form", handleNewsSearch);

 function handleNewsSearch(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!search.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertNews({
      title: search
        .val()
        .trim()
    });
  };

function upsertNews(newsData) {
	$.post("/api/news", newsData)
  	.then(getNews);
  }

// Needs editing
function createNewsRow(authorData) {
    var newTr = $("<tr>");
    newTr.data("news", newsData);
    newTr.append("<td>" + newsData.published + "</td>");
    newTr.append("<td> " + newsData.Posts.title + "</td>");
    newTr.append("<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newTr;
  }

function getNews() {
    $.get("/api/news", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderNewsList(rowsToAdd);
      nameInput.val("");
    });
  }

  function renderNews(rows) {
    newsList.children().not(":last").remove();
    newsContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      newsList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Author before you can create a Post.");
    newsContainer.append(alertDiv);
  }


};