// Variables

var userInput = "";
var movies = ['Peter Pan', 'Finding Nemo', 'Pinocchio']; 
var moviesFull = false;
var movieImage = "";
var imageRating = "";
var ratingText = "";


// Functions

// Create buttons from movie array
function createButtons () {
	$(".movieButtons").empty();
	for (var i=0; i<movies.length; i++) {
		$("<button class='movies'>" + movies[i] + "</button>").appendTo(".movieButtons");
	}
}

// Add user input to movie array
function addUserInput () {
	movies.push(userInput);
}

// Clear user input from text box and var
function clearUserInput () {
	userInput="";
	$(".searchBox").val("");
}

// KEY FUNCTIONS 

// Load page
$(document).ready(function() {

	// Display initial buttons
	createButtons();

	// On click for "addButton", get user input
	// Input shouldn't be empty, add to array, generate new array, clear user input
	// If input empty, display alert
	$('.addButton').click(function (e) {
		userInput = $(".searchBox").val();
			if (userInput !== "") {
				addUserInput();
				createButtons();
				clearUserInput();
			} else {
				alert("Please add a movie!");
			}
	});

	// Use parent element (in index) for dynamically created elements (won't exist yet, but can target here)
	$(".buttonSection").on("click", ".movies", function(event) {

		// User movie entry set to this variable
		var movieToAdd = $(this).text();
		// User movie entry to put into Giphy API query
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movieToAdd + "&api_key=dc6zaTOxFJmzC&limit=10";
	
		// Check console
		console.log(queryURL)
	
		// Get request to hit the Giphy API
		$.ajax({url: queryURL, method: 'GET'})

			// When API responds, run this function
			.done(function(response) {

				// Function that creates 10 images from array with for loop
				function giphyGenerate () {

					// Loop through length of response
					for (var i=0; i<response.data.length; i++) {

						// Create div for image to display in
						movieImage = $("<img class='stillImages'>");

						// Attach attributes to that image for the array items, set initial image to still
						movieImage.attr('src', response.data[i].images.fixed_height_still.url);
		    			movieImage.attr('data-still', response.data[i].images.fixed_height_still.url);
		    			movieImage.attr('data-animate', response.data[i].images.fixed_height.url);
		    			movieImage.attr('data-state', "still");		

		    			// Alters variable to hold this API endpoint
		    			imageRating = response.data[i].rating;

		    			// Alters variable to hold div we create here to hold rating text
		    			ratingText = $("<div class='rating'>");

		    			// Create text in rating div from variable (above) holding API endpoint
		    			ratingText.text("Rating: " + imageRating);

		    			// Adds rating text div to show at top of image
		    			$(".movieImages").append(ratingText);

		    			// Appends the image created each time to image div
		    			$(".movieImages").append(movieImage);

		    			// Set to true so you doesn't repeat appending images
		    			moviesFull = true;
					
					} // End for loop
				} // End giphyGenerate fxn

				// IF there already are no images 
				if (moviesFull == false) {

					// Call above fxn
					giphyGenerate();
				
				} else {
					// Clear out previous selections
					$(".movieImages").empty();

					// Marks variable as false after emptying images
					moviesFull = false;

					// Calls fxn above again
					giphyGenerate();
				}

			}); // End "done" fxn
	}); // End buttonSection click fxn


	// Target the whole document because they aren't created yet, need to "back up" so program can see objects
	$(document).on("click", ".stillImages", function(event) {
		var that = $(this);

		// Create variables to hold above attributes (see the click function)
		var currentData = that.attr("data-state");
		var animateCurrent = that.attr("data-animate");
		var stillCurrent = that.attr("data-still");

		// If data is still, animate it ; If data is animated, still it
		if (currentData == "still") {
			that.attr('data-state', "animate");
			that.attr('src', animateCurrent);
		} else if (currentData == "animate") {
			that.attr('data-state', "still");
			that.attr('src', stillCurrent);
		}	
	});


}); // End document.ready function