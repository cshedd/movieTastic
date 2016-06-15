$(document).ready(function() {


// Initial movie array 
	var movies = ['The Ghost Writer', 'Step Brothers', 'Titanic', 'Frozen', 'Forrest Gump', 'Emma', 'Jane Eyre', 'School for Scoundrels']; 



	//Function to display movies
	function displayMovie() {

		var movie = $(this).attr('data-movie');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=1";  //turns movie into string


		//Creates AJAX call for specific movie and parse into object
		$.ajax({
				url: queryURL,
				method: 'GET'
		}).done(function(response) {


			var results = response.data;
			
			$('#moviesView').empty();

			for(var i=0; i<results.length; i++){

				var movieGif = $('<div class="gif">');

				var rating = results[i].rating.toUpperCase();
				console.log(rating);

				if(rating == "") {
						rating = "N/A";
				}

				var specificRating = $('<div id="ratings">').text("Rating: " + rating);
				var movieImage = $('<img src=' + results[i].images.fixed_height_still.url + 'data-still=' + results[i].images.fixed_height_still.url + 'data-animate=' + results[i].images.fixed_height.url + 'data-state="still" class="comedyImage">');
			
				movieGif.append(specificRating);

				movieGif.append(movieImage);

				$('#moviesView').prepend(movieGif);
			}

		});
		
	}		

	displayMovie();	



	//Render buttons -- adding buttons and movies in array 
	function renderButtons() {

		$('#buttonsView').empty();

		//Create for loop for movie images
		for (var i = 0; i < movies.length; i++) {

			var a = $("<button></button>")
			a.addClass("movie");
			a.attr("data-movie", movies[i]);
			a.text(movies[i]);
			console.log(movies[i]);
			console.log(a);
			$("#buttonsView").append(a);
		}
	}


	function addMovie() {

	$('#addMovie').on('click', function() {

		var movie = $('#movie-input').val().trim();

		//Movie from textbox added to array
		movies.push(movie);

		//Array now runs which handles processing of movie array
		renderButtons();

		return false;

		})	

	}


	function animateImage() {

		var state = $(this).attr('data-state');

		if(state == 'still'){
				$(this).attr('src', $(this).data('animate'));
				$(this).attr('data-state', 'animate');	
		} else {
				$(this).attr('src', $(this).data('still'));
				$(this).attr('data-state', 'still');
		}
	}

	$(document).on("click", ".movie", displayMovie);
	$(document).on("click", ".movieImage", animateImage);

	renderButtons();
	addMovie();

});	
