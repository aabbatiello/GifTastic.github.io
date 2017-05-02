 // Initial array of actors

 var topics = ["Marlon Brando", "Robert Dinero", "Al Pacino", "Joe Pesci", "James Gandolfini", 
 "Ray Liotta", "Chazz Palminteri"];


function renderButtons() {
        $("#buttons-view").empty();
        // Looping through the array of actors
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each actor in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var button = $("<button>");
          button.addClass("gangstabutton")
          button.attr("data-name", topics[i]);
          button.text(topics[i]);

          // Adding the button to the buttons-view div
          $("#buttons-view").append(button);
        }
      }

// Calls the intial buttons within the Array 
$(document).ready(function() {
  renderButtons();
});

// This function handles events where a gangsta button is clicked
      $("#add-gangsta").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var topic = $("#gangsta-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
     
   });



// fetch gangsta Gifs with the Giphy API
function Gangsta() {
  // Get the actors name from the button clicked
        var gangstaname = $(this).attr("data-name");

  //GIPHY URL
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gangstaname + 
                 "&api_key=dc6zaTOxFJmzC&limit=10";
                 
// Make the AJAX call to the Giphy API
$.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response){
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);


            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
      };

$(document).on("click", ".gangstabutton", Gangsta);
