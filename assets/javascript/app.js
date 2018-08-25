//Create initial array of cartoons
var topics = ["Mickey Mouse", "Spongebob", "Futurama", "Looney Tunes", "The Simpsons", "Adventure Time", "Hey Arnold", "Rick and Morty", "Dexter's Lab", "CatDog", "Pokemon", "Pinky and the Brain", "Beavis and Butthead", "Dragon Ball Z"];

//Create variable to hold value for offset
var newGifs = 0;

//Function that renders the HTML to display gifs
function displayGifs() {

    //Create variable that holds data-attribute of button that was clicked
    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search";

    //Creating AJAX call 
    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            api_key: "vPp9MKW3v2lgQjuvIvyviOQlxSl9Z9ar",
            q: cartoon,
            limit: 10,
            offset: newGifs,
        }
    }).then(function (response) {
        //Create variable for information stored inside data key
        var results = response.data;
        console.log(results);

        //Create loop to display each result
        for (var i = 0; i < results.length; i++) {
            //Create div to store gif/rating/etc
            var cartoonDiv = $("<div>").addClass("cartoonDiv");
            //Create paragraph
            var p = $("<p>");
            //Set the paragraph to the rating of the gif
            p.text("Rating: " + results[i].rating);
            //Make an image tag
            var cartoonImage = $("<img>").addClass("img-fluid gif");
            //Set the results still image to the img tag just created
            cartoonImage.attr("src", results[i].images.fixed_height_still.url);
            //Add data-still and data-animate attributes to cartoonImage
            cartoonImage.attr("data-still", results[i].images.fixed_height_still.url);
            cartoonImage.attr("data-animate", results[i].images.fixed_height.url);
            //Add attribute of data-state and set to still
            cartoonImage.attr("data-state", "still");
            //Create download link
            var downloadButton = $("<a>").addClass("download-button");
            //Add text to download button
            downloadButton.text("Download GIF");
            //Add attributes to download button
            downloadButton.attr("href", results[i].images.fixed_height.url);
            downloadButton.attr("download", results[i].title);
            //Append the cartoonImage to the cartoonDiv
            cartoonDiv.append(cartoonImage);
            //Append the p to the cartoonDiv
            cartoonDiv.append(p);
            //Append download button to the rating paragraph
            p.append(downloadButton);
            //Prepend the cartoonDiv to the cartoon-appear-here div
            $("#cartoons-appear-here").prepend(cartoonDiv);
        };
        //Add 10 to the offset value so we get 10 new gifs
        newGifs += 10;
    });
};

function displayCartoonInfo () {
    var cartoonInfo = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/";

    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            apikey: "4883e967",
            t: cartoonInfo,
            
        }
    }).then(function(response){
        console.log(response);
        var ratings = $("<p>");
        ratings.text("IMDb Rating for " + response.Title + " : " + response.imdbRating)
        $("#ratings-appear-here").html(ratings);
    })
}

//Function to display buttons for topics array
function renderButtons() {
    //Prevents repeat buttons
    $("#cartoonButtons").empty();

    //Looping through topics array
    for (var i = 0; i < topics.length; i++) {
        //Dynamically generate button elememt
        var button = $("<button>");
        //Add class of cartoon-btn to each button created
        button.addClass("cartoon-btn");
        //Add data-attribute to each button equivalent to item in topics array
        button.attr("data-name", topics[i]);
        //Create text for each button equivalent to item in topics array
        button.text(topics[i]);
        //Add the buttons to the cartoonButtons div
        $("#cartoonButtons").append(button);
    };
};

//Function to add user input into topics array and create a button for it
$("#addCartoon").on("click", function (event) {
    event.preventDefault();
    //Get the value of what the user entered
    var userInput = $("#cartoon-input").val().trim();
    //Push the input to the topics array
    topics.push(userInput);
    //Call renderButtons to display new button
    renderButtons();
    //Empty the form
    $("#cartoon-input").val("");
});

//Function to play and pause gifs
$(document).on("click", ".gif", function () {
    // Create variable to hold data-state
    var state = $(this).attr("data-state");

    // If statement to check if data-state is equal to still
    if (state == "still") {
        //Change data-state attribute to animate
        $(this).attr("data-state", "animate");
        //Change img source to value of data-animate
        $(this).attr("src", $(this).attr("data-animate"));

    } else {
        //Change data-state attribute to still
        $(this).attr("data-state", "still");
        //Change img source to value of data-still
        $(this).attr("src", $(this).attr("data-still"));
    }
})

//Adding click event listener to all elements with class of "cartoon-btn" and calling displayGifs function
$(document).on("click", ".cartoon-btn", displayGifs);
$(document).on("click", ".cartoon-btn", displayCartoonInfo);

//Calling renderButtons function to display initial topics array
renderButtons();