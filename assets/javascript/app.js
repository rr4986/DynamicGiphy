var topics = ["New York City", "London", "Paris", "Rome", "Amsterdam", "Munich"]

function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#button-space").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("city");
    // Adding a data-attribute
    a.attr("city-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#button-space").append(a);
  }
}

renderButtons();


$("button").on("click", function() {
  // Grabbing and storing the data-animal property value from the button
  var city = $(this).attr("city-name");

  // Constructing a queryURL using the animal name
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    city + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .done(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var cityDiv = $("<div>");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var cityImage = $("<img>");
    
        cityImage.attr("src", results[i].images.fixed_height_still.url);

        cityImage.attr("data-state", "still");

        cityImage.addClass(".gif");

        cityDiv.append(p);

        cityDiv.append(cityImage);

        $("#gif-space").prepend(cityDiv);

        
      }

      $("img").on("click", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {  

          var gifLink = $(this).attr("src");
          gifLink = gifLink.replace('_s','');
          $(this).attr("src", gifLink);
          $(this).attr("data-state", "animated");


        } else {
          var gifLink = $(this).attr("src");
          gifLink = gifLink.replace('.gif','_s.gif');
          $(this).attr("src", gifLink);
          $(this).attr("data-state", "still");

        }
      });

    });
});

