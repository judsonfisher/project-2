// ALL OF THIS NEEDS WORK
$(document).ready(function() {

console.log("working");

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

 // var resultContainer = $(".result-container");
 // var search = $("#newsInput");
 
 $("#search").on("click", function {
  var searched = $("#newsInput").val().trim();
  searched = searched.replace(/\s+/g, "").toLowerCase();
  getData();
});

function getData() {
 $.get("/api/articles", function(data) {
    articles = data;
    insertData();
  });
};

function insertData() {
 // Create code to insert titles/imgs into exisiting structures
};