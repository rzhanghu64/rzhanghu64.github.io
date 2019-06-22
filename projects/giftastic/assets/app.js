//Initial values
var topics = ["Pokemon", "Final Fantasy", "Mario", "Warcraft", "Minecraft"];
var apiKey = "dc6zaTOxFJmzC";
var imageLimit = 10;

//When called, generateButtons will generate buttons for each element of the topics array
function generateButtons() {
  $("#button-container").empty();
  topics.forEach(function(element) {
    var button = $("<button>");
    button.attr("topic", element);
    button.attr("class", "topic-button btn btn-primary");
    button.text(element);
    $("#button-container").append(button);
  });
}
generateButtons();

// When clicking on a topic button, do an Ajax query, then form containers for each result
$(document).on("click", ".topic-button", function() {
  var topicQuery = $(this).attr("topic");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topicQuery +
    "&api_key=" +
    apiKey +
    "&limit=" +
    imageLimit;

    //Generate gif cards from ajax response
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#image-container").empty();
    var results = response.data;
    results.forEach(function(element) {
      var gifCard = $("<div>");
      gifCard.addClass("card");

      var cardImg = $("<img>");
      cardImg.addClass("gif-image");
      cardImg.addClass("card-img-top");
      cardImg.attr("src", element.images.fixed_height_still.url);
      cardImg.attr("data-animated", element.images.fixed_height.url);
      cardImg.attr("data-still", element.images.fixed_height_still.url);
      cardImg.attr("data-state", false);

      var cardBody = $("<div>");
      cardBody.addClass("card-body");
      
      var cardText = $("<p>").text("Rating: " + element.rating);
      cardText.addClass("card-text");

      gifCard.append(cardImg);
      cardBody.append(cardText);
      gifCard.append(cardBody);

      $("#image-container").prepend(gifCard);
    });
  });
});

//Enter key will call the click function on add button
$(document).bind("keypress", function(event) {
  if (event.keyCode == 13) {
    $("#add-topic-button").trigger("click");
  }
});

//Add a new entry to the topics array and regenerate buttons
$("#add-topic-button").on("click", function(event) {
  event.preventDefault();
  var newTopic = $("#search-bar").val();
  topics.push(newTopic);
  generateButtons();
  $("#search-bar").val("");
});

//Toggle animation state on click by change the source img between the still and animated versions
$(document).on("click", ".gif-image", function() {
  var newSource;
  var currentState = $(this).data("state");
  if (currentState == false) {
    newSource = $(this).data("animated");
    $(this).data("state", true);
  } else {
    newSource = $(this).data("still");
    $(this).data("state", false);
  }
  $(this).attr("src", newSource);
});
