var len;

var results = '';



function apiSearch() {

    results = ''



    var params = {

        "q": $("#query").val(),

        "count": "50",

        "offset": "0",

        "mkt": "en-us"

    };



    $.ajax({

        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),

        beforeSend: function (xhrObj) {

            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "096942b56968447093213e33ec4143f0");

        },

        type: "GET",

    })

        .done(function (data) {

            len = data.webPages.value.length;

            for (i = 0; i < len; i++) {

                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";

            }



            $('#searchResults').html(results);

            $('#searchResults').dialog({

                height: 400,

                width: 600,

                modal: true,

                title: `Search Results`,

            });

        })

        .fail(function () {

            alert("error");

        });

}

function backgroundImageChanger() {



    // Get a reference to the element

    var element = document.body;



    // Get the computed style of the element

    var computedStyle = window.getComputedStyle(element);



    // Extract the background-image property

    var backgroundImage = computedStyle.getPropertyValue('background-image');



    // Use String methods to extract the image name

    var imageUrl = backgroundImage.match(/\/([^/]+)$/);

    var imageName = imageUrl ? imageUrl[1] : null;

    imageName = imageName.slice(0, -2)



    if (imageName == 'FootballPic.jpg') {

        document.body.style.backgroundImage = 'url("./Assets/football2.jpg")'

    } else {

        document.body.style.backgroundImage = 'url("./Assets/FootballPic.jpg")'

    }

}



function ChangeElementResultsVibility(elementName) {

    let visibilityCheck = document.getElementById(`${elementName}`).style.visibility

    if (visibilityCheck == 'hidden') {

        document.getElementById(`${elementName}`).style.visibility = 'visible'

    } else {

        document.getElementById(`${elementName}`).style.visibility = 'hidden'

    }

}



function QuerySearch() {

    ChangeElementResultsVibility("searchResults")

    apiSearch()

    document.getElementById("query").value = ''

    ChangeElementResultsVibility("searchResults")

}



// Function to update the textbox with the current time

function updateTimeTextBox() {

    ChangeElementResultsVibility("time")

    const currentTimeString = new Date().toLocaleTimeString();



    $('#time').text(currentTimeString);



    $('#time').dialog({

        //title: "Current Time",

        modal: true,

    });

    ChangeElementResultsVibility("time")

}

function throwHailMary() {
    // Random number between 1 and 10
    let randomChance = Math.floor(Math.random() * 10) + 1;

    if (randomChance === 7) {
        // Open the special image if random chance is 7
        window.open("./Assets/footballcursor.png", "Window Title", "width=500, height=500");
    } else {
        // List of general query terms
        const queries = [
            "news",
            "weather",
            "technology",
            "sports",
            "health",
            "entertainment",
            "finance",
            "travel",
            "food",
            "science",
            "fun facts",
            "random"
        ];

        // Randomly select a query from the list
        const randomQuery = queries[Math.floor(Math.random() * queries.length)];

        // Prepare the API search parameters with the randomly selected query
        var params = {
            "q": randomQuery,  // Randomly selected general query
            "count": "1",     // Increase count to get more results
            "offset": "0",
            "mkt": "en-us"
        };

        // Perform the AJAX request to the Bing Search API
        $.ajax({
            url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "096942b56968447093213e33ec4143f0");
            },
            type: "GET",
        })
            .done(function (data) {
                // Check if we have results
                if (data.webPages && data.webPages.value.length > 0) {
                    // Get a random index from the results
                    let randomIndex = Math.floor(Math.random() * data.webPages.value.length);
                    // Open the randomly selected webpage result in a new tab
                    window.open(data.webPages.value[randomIndex].url, '_blank');
                } else {
                    alert("No results found.");
                }
            })
            .fail(function (jqXHR) {
                // Handle errors
                if (jqXHR.status === 401) {
                    alert("Authorization error: Please check your API key.");
                } else {
                    alert("Error fetching results. Please try again.");
                }
            });
    }
}





