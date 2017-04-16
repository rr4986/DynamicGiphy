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

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var cityDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var cityImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        cityImage.attr("src", results[i].images.fixed_height.url);

        cityImage.addClass(".gif");

        // Appending the paragraph and image tag to the animalDiv
        cityDiv.append(p);
        cityDiv.append(cityImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gif-space").prepend(cityDiv);
      }
    });
});

$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});