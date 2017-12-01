// ALL OF THIS NEEDS WORK
$(document).ready(function() {

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