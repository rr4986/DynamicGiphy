var topics = ["New York", "London", "Paris", "Rome", "Madrid", "Shanghai"]

function renderButtons() {


  $("#button-space").empty();

 
  for (var i = 0; i < topics.length; i++) {

    var newButton = $("<button>");

    newButton.addClass("city");
 
    newButton.attr("city-name", topics[i]);
 
    newButton.text(topics[i]);
  
    $("#button-space").append(newButton);

  }
}

renderButtons();

$("#add-gif").on("click", function(event) {

  event.preventDefault();
  
  var gif = $("#gif-input").val().trim();
  
  topics.push(gif);

  var anotherButton = $("<button>");

  anotherButton.addClass("city");
 
  anotherButton.attr("city-name", gif);
 
  anotherButton.text(gif);
  
  $("#button-space").append(anotherButton);

});



$(document).on("click", ".city", function() {
 
  var city = $(this).attr("city-name");


  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    city + "&api_key=dc6zaTOxFJmzC&limit=10";


  $.ajax({
      url: queryURL,
      method: "GET"
    })

    .done(function(response) {

      $("#gif-space").empty();
      console.log(queryURL);

      console.log(response);

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
          gifLink = gifLink.replace('_s.gif','.gif');
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


