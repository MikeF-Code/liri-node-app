# LIRI

This is a CLI app for running various queries related to music and movies.  It returns information using the Bands In Town, Spotify, and OMDB APIs.  You'll need to provide your own API keys in a .env file in order to correctly make use of this app.

*Note: Please ensure you have installed all dependencies in order for this app to run correctly.*

## Usage

In your CLI, run *node liri [parameter] [query]*.  *[parameter] [query]* consists of one of the following:

* __concert-this [artist name]__
    * This will query the Bands In Town API, returning information about a selected artists' next upcoming concert, and displaying it in the following format:
        * Concert Venue:
        * Venue Location:
        * Concert Date & Time:
        
* __spotify-this-song [song]__
    * This will query the Spotify API, returning information about a selected song, in the following format:
        * Artist:
        * Track:
        * Preview URL:
        * Album
        
* __movie-this [movie title]__
    * This will query the OMDB API, returning information about a selected movie, in the following format:
        * Title:
        * Release Year:
        * IMDB Rating:
        * Rotten Tomatoes Rating:
        * Country of Production:
        * Language:
        * Plot Summary:
        * Starring:
        
* __do-what-it-says__
    * Included in this app is a *random.txt* file, containing a predefined *[parameter]* and *[query]*.  Using the __do-what-it-says__ parameter will run this predefined set.
