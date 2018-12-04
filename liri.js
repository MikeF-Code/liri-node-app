// Allows for use of dotenv for importing API keys from .env file
require("dotenv").config();

// Initialize moment.js package for use in app
const moment = require("moment");

// Importing API Keys from 'keys.js' into a variable for later use
const keys = require('./keys.js');

// Initialize Axios package for use in app
const axios = require("axios");

// Initialize node-spotify-api for use in app
const Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

// Importing keys.js file and storing it in a variable
const fs = require('fs');

// Grab arguments from command line
let service = process.argv[2];
let searchquery = [];


// Since queries can be of variable length, we need to loop through the text supplied after the 'service' parameter to get our full query.
for (var i = 3; i < process.argv.length; i++) {
    searchquery.push(process.argv[i]);
  }

// Use 'join' method to change array to a string for proper query syntax
searchQuery = searchquery.join(' ');

// Switch case is wrapped in a function for ease of re-use.
let Query = function(){
    // Switch statement to handle different command line arguments
    switch (service) {
        // Bands in Town query
        case "concert-this":
            axios
                .get("https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id="+keys.bit.key)
                .then(function(response) {
                    console.log("Concert Venue: "+response.data[0].venue.name);
                    console.log("Venue Location: "+response.data[0].venue.city);
                    let eventTime = moment(response.data[0].datetime);
                    console.log("Event Date & Time: "+ eventTime.format("dddd, MM/DD/YYYY"));
                });
            break;
        // Spotify query
        case "spotify-this-song":
            if (searchQuery == "") {
                spotify
                    .search({ type: 'track', query: "The Sign" })
                    .then(function(response){
                        console.log("Artist: "+response.tracks.items[8].artists[0].name);
                        console.log("Track: "+response.tracks.items[8].name);
                        console.log("Preview URL: "+response.tracks.items[8].preview_url);
                        console.log("Album: "+response.tracks.items[8].album.name);
                    })
            } else {
            spotify
                .search({ type: 'track', query: searchQuery })
                .then(function(response){
                    console.log("Artist: "+response.tracks.items[0].artists[0].name);
                    console.log("Track: "+response.tracks.items[0].name);
                    console.log("Preview URL: "+response.tracks.items[0].preview_url);
                    console.log("Album: "+response.tracks.items[0].album.name);
                });
            };
            break;
        // OMDB query
        case "movie-this":
            if (searchQuery == "") {
                axios
                    .get("http://www.omdbapi.com/?t=mr nobody&y=&plot=short&apikey="+keys.omdb.key)
                    .then(function(response){
                        console.log("Title: "+response.data.Title);
                        console.log("Release Year: "+response.data.Year);
                        console.log("IMDB Rating: "+response.data.imdbRating);
                        console.log("Rotten Tomatoes Rating: "+response.data.Ratings[1].Value);
                        console.log("Country of Production: "+response.data.Country);
                        console.log("Language: "+response.data.Language);
                        console.log("Plot Summary: "+response.data.Plot);
                        console.log("Starring: "+response.data.Actors);
                    })
            } else {
            axios
                .get("http://www.omdbapi.com/?t="+searchQuery+"&y=&plot=short&apikey="+keys.omdb.key)
                .then(function(response){
                    console.log("Title: "+response.data.Title);
                    console.log("Release Year: "+response.data.Year);
                    console.log("IMDB Rating: "+response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: "+response.data.Ratings[1].Value);
                    console.log("Country of Production: "+response.data.Country);
                    console.log("Language: "+response.data.Language);
                    console.log("Plot Summary: "+response.data.Plot);
                    console.log("Starring: "+response.data.Actors);
                });
            }
            break;
        // Default case to handle unspecified arguments
        default:
            console.log("Please use one of the following commands to utilize this app:");
            console.log("concert-this: "+"Search Bands in Town");
            console.log("spotify-this-song: "+"Search Spotify");
            console.log("movie-this: "+"Search OMDB");
            console.log("do-what-it-says: "+"Read from random.txt and do what it says!");
            break;
    };
};

// Actual app logic.
if (service === "do-what-it-says") {
    // Reads the random.txt file, takes the contents and puts it into an array.
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        // Array indexes are used to update values of 'service' and 'searchQuery' variables, to be utilized in the Query() function.
        service = dataArr[0];
        searchQuery = dataArr[1];
        Query();
    });
} else {
    // Take the process.argv indexes and use those to Query instead.
    Query();
};

