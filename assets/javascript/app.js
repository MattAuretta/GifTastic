//Create initial array of cartoons
var topics = ["Mickey Mouse", "Spongebob", "Futurama", "Looney Tunes", "The Simpsons", "Adventure Time", "Hey Arnold", "Rick and Morty", "Dexter's Lab", "CatDog", "Pokemon", "Pinky and the Brain", "Beavis and Butthead", "Dragon Ball Z"];

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
            //Append the p to the cartoonDiv
            cartoonDiv.append(p);
            //Append the cartoonImage to the cartoonDiv
            cartoonDiv.append(cartoonImage);
            //Prepend the cartoonDiv to the cartoon-appear-here div
            $("#cartoons-appear-here").prepend(cartoonDiv);
        };
        //Function to play and pause gifs
        $(".gif").on("click", function () {
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
    });
};

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
});

//Adding click event listener to all elements with class of "cartoon-btn" and calling displayGifs function
$(document).on("click", ".cartoon-btn", displayGifs);

//Calling renderButtons function to display initial topics array
renderButtons();