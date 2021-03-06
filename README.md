# Build Status
[![Build Status](https://travis-ci.org/shopglobal/liri.svg?branch=master)](https://travis-ci.org/shopglobal/liri)

# LIRI BOT
<pre>
    ___      _    __          __ 
   / (_)____(_)  / /_  ____  / /_
  / / / ___/ /  / __ \/ __ \/ __/
 / / / /  / /  / /_/ / /_/ / /_  
/_/_/_/  /_/  /_.___/\____/\__/  
</pre>

Current Version: 2.0.7-stable 

Help README
---------------------------------------------------------------------------------------------------
LIRI is similar to CORTANA or SIRI in the fact that it can find out information for you. You can check out the latest information about your favorite songs, 
look into your favorite movies by searching the name, define words, check the weather, and check out all the latest posts from the twitter feed.  
Enjoy your experience with LIRI.

![demo](https://user-images.githubusercontent.com/12779751/31199665-1a42933e-a926-11e7-8b53-2eab209c069e.gif)

Here is how to use LIRI:
---------------------------------------------------------------------------------------------------
The [COMMAND] is what you command LIRI to do, and the [ARGUMENTS] are the parameters that you need to 
pass to LIRI to get what you are looking for. The [ARGUMENTS] will change determined by user input based on what you are
looking for, or trying to do. 

# Breaking down the Code
Let's setup a couple of Global Enviornment Variables. 
Let's take a look at the processes in Node which handle these queries for the app. . . 
process.argv = user inputs

//start listening to user inputs in the state
<code>var nodeArgs = process.argv;</code>

//create an array for user inputs
<code>var argArray = [];</code>

//assign commands and titles from user inputs
<code>
  var command = nodeArray[2];
	var input = [];
</code>

Establish user input as length of all of the arguments, determined by the user input which is needed for a proper query with Request.
To do this, we must loop through the user inputs like so; 
<code>for(k=3; k < nodeArray.length; k++){
    input.push(nodeArray[k]);
}</code>

Understanding the need for User Input loop, how-to do it (I did it, you can too!) and the reason for it, is the below illustration:

# boolean
 Take this string of numbers for example, look at the boolean value of each integer and then think of the remainder as > your favorite number. 
 (ex. the index you need for your code to function)

<code>0 > 1 > 2 > 3 > 3 > 3 > 3 > 3 > 3 > 3 > 3</code>

# command

 Take this LIRI command for example and look at the value of the first input which matters to your code:

<code>==/~ 0  _    1____2_______3_____>3___>3___>3 =====>>>>>  </code>


<code>/~ node liri movie "really long movie title"</code>

The input's matter, to your code, and we handle this carefully by implementing the following loop: 

# for
Take a look at this quick for loop I created which takes in user inputs, and establishes origin to a predefined index of 3. Which is where the important user input is located:
<code>for (l=3; l < nodeArgs.length; l++){
argArray.push(nodeArgs[l]);
}</code>

# Pre-Installation
You must have a Spotify API Key & Secret and Also a Twitter Access Token & Secret in order for those functions to work.
Prior to attemtping installation, visit both site and create your API access tokens in the following manner:

Spotify - save file to root as spotifykeys.js
<pre>const chalk = require("chalk");
console.log(chalk.green('Spotify keys loaded'));

var Spotify = require('node-spotify-api');
var spotifyKeys = new Spotify({
  id: 'enter-your-spotify-id',
  secret: 'enter-spotify-secret',
});


module.exports = spotifyKeys;</pre>

Twitter - save file to root as twitterkeys.js
<pre>const chalk = require("chalk");
console.log(chalk.green('Twitter keys loaded'));
var Twitter = require('twitter');

var twitterKeys = new Twitter({
  consumer_key: 'twitter-consumer-key',
  consumer_secret: 'twitter-consumer-secret',
  access_token_key: 'twitter-access-token-key',
  access_token_secret: 'twitter-access-token-secret',
});

module.exports = twitterKeys;</pre>
# Installation
Clone this repository:
<code>git clone https://github.com/shopglobal/liri.git</code>
Install dependancies
<code>npm install</code>
Run liri with node app, or node liri
<code>node app [commands] [argumentsLoop]</code>
For example
<code>node liri tweets [username]</code>
<code>node liri movies [movie Name]</code>
<code>node liri song [song Name]</code>
<code>node liri get-weather [name of place]</code>

# Getting Started:
# /~ node liri.js init

![init](https://user-images.githubusercontent.com/12779751/31199672-1a5727c2-a926-11e7-8b14-ef4b621c96db.gif)

When you run the liri.js file using the console. 
You just have to type the following into the terminal:
# /~ node liri.js (COMMAND) (ARGUMENT)


# /~ node liri.js prompt

![prompt](https://user-images.githubusercontent.com/12779751/31199673-1a57e356-a926-11e7-9038-6a207c64aa51.gif)


Examples:
# /~ node liri.js get-tweets [ARGUMENTS]
![get-tweets](https://user-images.githubusercontent.com/12779751/31199668-1a4c7cfa-a926-11e7-8fb5-966323b7fc6a.gif)

  This will return your last 20 tweets that you have tweeted.
# /~ node liri.js my-tweets
![tweets](https://user-images.githubusercontent.com/12779751/31199666-1a428290-a926-11e7-8ed9-bdd968bf7557.gif)


# /~ node liri.js spotify-this-song [ARGUMENTS]
![spotify-this-song](https://user-images.githubusercontent.com/12779751/31199674-1a77673a-a926-11e7-9d88-98b13c73d28e.gif)

# /~ node liri.js spotify-this-song "Money Pink Floyd"
  This will return the song titled Money by Pink Floyd and will also give the artist, album, and a URL that
  will give you a 30 second preview of the song.


# /~ node liri.js movie-this [ARGUMENTS]
![movie-this](https://user-images.githubusercontent.com/12779751/31199671-1a5307aa-a926-11e7-9899-894c12e75b0b.gif)

# /~ node liri.js movie-this Guardians of the Galaxy
  This will return a movie with the title Guardians of the Galaxy and give you a quick synopsis of the movie and 
  a link where there to find out more information about the movie.



MORE INFORMATION:
---------------------------------------------------------------------------------------------------
You can always ask LIRI for help at:
# /~  node liri.js help

![help](https://user-images.githubusercontent.com/12779751/31199669-1a4ce514-a926-11e7-9a58-15d078fded06.gif)


Learn more about LIRI with the following command: 
# /~ node liri.js about

![about](https://user-images.githubusercontent.com/12779751/31199675-1a94f25a-a926-11e7-94ff-36022595a9ce.gif)


Check the status of your LIRI app & version at:
# /~  node liri.js status
![status](https://user-images.githubusercontent.com/12779751/31199663-1a417648-a926-11e7-9dfa-d36ca68cba9b.gif)


	


MORE FEATURES: 
# /~ node liri.js get-weather [ARGUMENTS]
![get-weather](https://user-images.githubusercontent.com/12779751/31199670-1a4ccfe8-a926-11e7-9b03-ecbb161b0800.gif)

# /~ node liri.js count-to [ARGUMENTS]
![count](https://user-images.githubusercontent.com/12779751/31199667-1a476c60-a926-11e7-880c-018058df64e7.gif)


# /~ node liri.js do-what-it-says
![do-what-it-says](https://user-images.githubusercontent.com/12779751/31199664-1a4243fc-a926-11e7-8813-18db46453adb.gif)



