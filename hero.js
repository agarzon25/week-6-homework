// Initial array of hero
const heroes = ["The Flash", "Spiderman", "Batman", "Captain America", "Superman", "Ironman", "Wonder Woman", "Hulk", "Green Arrow"];

// displayheroInfo function re-renders the HTML to display the appropriate content
function displayheroInfo() {

	//Creating an element for 
	const hero = $(this).attr("data-name");

	//url for selected hero
	const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=SJQy3yR5xwmDtqTM87GGATjhpNBnQB6I&limit=10";

	// gif url list
	//const gif_list = [];

	// Creating an AJAX call for the specific hero button being clicked
	$.ajax({

		// URL for selected hero
		url: queryURL,

		// Using get method
		method: "GET"

		//function to handle JSON object returned
	}).done(function(object) {

		// Resets hero-view after each click
		$("#hero-view").empty();

		// Retrieving data object 
		const response = object.data;

		// Creating a div to hold the hero`
		const heroDiv = $("<div class='hero'>");

		// for each element in response array store the rating/img data
		response.forEach(function(o) {

			// Creating an element to hold the rating
			const rating = $("<p>").text("Rating: " + o.rating);

			// Appending rating
			heroDiv.append(rating);

			const still_image = o.images.fixed_width_still.url

			// Creating an element to hold the still image
			const still = $("<img class='still'>").attr("src", still_image).attr("data-still", still_image);

			// Appending the image
			heroDiv.append(still);
		
			// Creating an element to hold the gif url
			const gif_url = o.images.fixed_width.url

			//Creating an element to hold the gif
			const gif = $("<img class='gif'>").attr("src", gif_url);

			// Hiding all gifs to display only the still image
			gif.hide();

			// Appending the image
			heroDiv.append(gif);
		});

		// Displaying the entire heroDiv generated after the click
		$("#hero-view").html(heroDiv);
	})
}

// Creating 
function runGif() {

	// Obtaining still src url
	const still_src = ($(this).attr("data-still"))

	// Obtaining gif url 
	const gif_src = ($(this)[0].nextSibling.src)
	
	// running if loop to toggle between still image and gif
	if ($(this).hasClass("still")) {

		// removing still class
		$(this).removeClass("still")

		// adding gif class
		$(this).addClass('gif')

		// Displaying gif
		$(this).attr("src", gif_src);
	} else {

		// Add still class
		$(this).addClass("still")

		// Remove gif class 
		$(this).removeClass('gif')

		// Display still image
		$(this).attr("src", still_src)
	}
}

// Function to create buttons
function renderButtons() {

	// Clear buttons-view div each time renderButtons is run
	$("#buttons-view").empty();

	// Looping through current length of heroes array and creating a button for 
	heroes.forEach(function(h) {

		// Variable set for jquery button tag
		const btn = $("<button>");

		// Adding hero class
		btn.addClass("hero");

		// Adding in the content for each button
		btn.attr("data-name", h);

		// Printing hero name to each button
		btn.text(h);

		// Appending a button for each 
		$("#buttons-view").append(btn);
	});
}

// Add a new hero when pressing submit
$("#add-hero").on("click", function(event) {

	// Prevents refresh of page after clicking submit
	event.preventDefault();

	// Creating an element for hero-input value and trim whitespace
 	const hero_input = $("#hero-input").val().trim();

	// Add new hero to heroes array
	heroes.push(hero_input);

	// Re-create buttons appending the new hero name
	renderButtons();
});

// Listener for any click on hero div
$("#buttons-view").on("click", ".hero", displayheroInfo);

// Render first buttons
renderButtons();

// Listener for any click on img and running runGif when done so
$("#hero-view").on("click", "img", runGif);