 
 	//PART 1
	//declearing variables for initial countries/buttons and their div, new country button div, gif display div, and actual new button
	var countries = ["USA", "Mexico", "Jamaica", "Italy", "Netherlands", "Switzerland", "Egypt", "Japan", "China", "Thailand"];
	var initialButtons = $("#initialButtons");
	var addCountry = $("#addCountry");
	var gifDisplay = $("#gifDisplay");
	
	//making it when a button is added it does not re-create the initial buttons, adding a class for country buttons, appending initial country buttons, assigning the attribute of country for functions
	function addButtons() {
		initialButtons.empty();
			for (var i=0; i<countries.length; i++) {
			button= $("<button>").addClass("divider").addClass("countryButton").text(countries[i]).attr("country", countries[i]);
			initialButtons.append(button);
		}
	};

	//calling the function to add the initial buttons
	addButtons();

	//function for clicking the addCountry button to push the value of the countryText box to the countries array using a variable defining that value
	addCountry.on("click",function() {
	var userSearch = $("#countryText").val().trim();
	$("#countryText").val();
	countries.push(userSearch);

	//calling the function to add the new button
	addButtons();
	});

	//PART 2
	//setting up a function to display the gifs when clicking a country, setting up the variables for the AJAX call with a limit of 20 results
	$(document).on("click", ".countryButton", displayGifs);
	function displayGifs() {
		gifDisplay.empty();
	var country = $(this).attr("country")
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+country+"&api_key=IV4Tqwl1gjQXxkGsyq9J2Ad8vJmfCIaA&limit=20"

	//AJAX call to retrieve the gifs and a for loop to display each result item
	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {
	var results = response.data;
		for (i=0; i<results.length; i++) {

	//creating a variable countryDiv
	var countryDiv = $("<div>").addClass("country-div").addClass("divider2");

	//creating a variable p to hold the text of the rating result
	var p = $('<p>').text("Rating: " + results[i].rating);

	//creating a variable gif to hold the still and amimated gifs in an image tag, with the still result being shown by default
	var gif = $("<img>").addClass("gif").attr("src",results[i].images.fixed_width_still.url).attr("data-animate",results[i].images.fixed_width.url).attr("data-still", results[i].images.fixed_width_still.url).attr("data-state", "still");
	
	//appending the text of the p tag to the country div
	countryDiv.append(p);

	//prepending the gif to the country div
	countryDiv.prepend(gif);

	//appending the countrty div to the gif display
	gifDisplay.append(countryDiv);
	};

	//PART 3- on click function for playing and pausing the gifs
	$(".gif").on("click", function() {
	var state = $(this).attr("data-state");
		if (state == "still") {
        	$(this).attr("src", $(this).attr("data-animate"));
        	$(this).attr("data-state", "animate");
      	} else{
        	$(this).attr("src", $(this).attr("data-still"));
        	$(this).attr("data-state", "still");
    			};
			});
		});
	};