//Create initial array of cartoons
var topics = ["Mickey Mouse", "Spongebob", "Futurama", "Looney Tunes", "The Simpsons", "Adventure Time", "Hey Arnold", "Rick and Morty", "Dexter's Lab", "CatDog", "Pokemon", "Pinky and the Brain", "Beavis and Butthead", "Dragon Ball Z"];

//Function that renders the HTML to display gifs
function displayGifs() {
    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search";

    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            api_key: "vPp9MKW3v2lgQjuvIvyviOQlxSl9Z9ar",
            q: cartoon,
            limit: 10,
        }
    }).then(function (response) {
        console.log(response);
    });
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
    }
}

//Adding click event listener to all elements with class of "cartoon-btn" and calling displayGifs function
$(document).on("click", ".cartoon-btn", displayGifs);

//Calling renderButtons function to display initial topics array
renderButtons();