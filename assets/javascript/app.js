//Create initial array of cartoons
var topics = ["Mickey Mouse", "Spongebob", "Futurama", "Looney Tunes", "The Simpsons", "Adventure Time", "Hey Arnold", "Rick and Morty", "Dexter's Lab", "CatDog", "Pokemon", "Pinky and the Brain", "Beavis and Butthead", "Dragon Ball Z"];

//Function to display buttons for topics array
function renderButtons() {
    //Prevents repeat buttons
    $("#cartoonButtons").empty();

    //Looping through topics array
    for(var i = 0; i < topics.length; i++) {
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

//Calling renderButtons function to display initial topics array
renderButtons();