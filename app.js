var request = require("request");
var fs = require('fs');
var inquirer = require("inquirer");
var inquire = inquirer;
var weather = require("weather-js");
const chalk = require("chalk");

var Keys = require('./key.js');

var myArgs = process.argv[2];
var keyword = process.argv[2];
var input = process.argv[3];

var Twitter = require('twitter');
var screenName = process.argv[3];

var Spotify = require('node-spotify-api');
var song = "";
var songParam = process.argv;

var movieParam = process.argv;
var movieName = ""; 
var movieObj = [];

// var params = {screen_name: 'nodejs', count: 20};
var params = {screen_name: (screenName), count: 20};

//create an array for user inputs
var nodeArray = process.argv;
var nodeArgs = process.argv;
var argArray = [];
var value = argArray;
//assign commands and titles from user inputs
var command = nodeArray[2];
var input = [];

for(k=3; k<nodeArray.length; k++){
    input.push(nodeArray[k]);
};

for(m=3; m<movieParam.length; m++){
    movieObj.push(movieParam[m]);
};


//concatenates if multiple word title is entered
function titleConcat(input){
    var temp = ""
    if(input[0] === undefined){
        return input[0];
    }
    else{
        for(j=0; j<input.length; j++){
            temp = temp + " " + input[j].trim();
        };
    return temp.trim();
    }
};
for(l=3; l<nodeArgs.length; l++){
    argArray.push(nodeArgs[l]);
};
// ToDo add switched for my functions, and wrap my if statments inside functions...
// switch (action) {
//     case 'tweet':
//         tweet();
//         break;
//     case 'song':
//         song(value);
//         break;
//     case 'omdb':
//         omdb(value);
//         break;
//     case 'random':
//         random();
//         break;
// }
// Determine What LIRI is getting asked to do.

switch(command){
  case "twitter":
  // case "myTwitter":
  // case "my-tweets":
    getTweets();
    break;
  // case "songs":
  // case "spotify":
  // case "song":
  // case "spotifyThis":
  // case "spotifyThisSong":
  // case "spotify-this":
  // case "spotify-this-song":
  //   getSong(value);
  //   break;
  case "omdb-this":
  case "omdb":
  case "omdbThis":
  case "movieThis":
  case "movies":
    getMovie(value);
    break;
  case "rando":
  case "random":
  case "randomThis":
  case "random-this":
  // case "do-what-it-says":
    random();
    break;
  case "weather":
  case "weather":
  case "this-weather":
  case "thisWeather":
  case "weatherThis":
  case "weather-this":
  case "weather-get":
  case "get-weather":
    getWeather(value);
    break;
  case "count":
  case "countTo":
  case "countUpTo":
  case "count-to":
    countTo(value);
    break;
  case "help":
    help();
    break;
  case "about":
    about();
    break;
  case "status":
    status();
    break;    
  case "start":
  case "init":
    init();
    break;
  case "stop":
  case "kill":
    terminate();
    break;    
  case "setup":
    setup();
    break;
} // end switch()

// Functions
function help(){
  console.log(chalk.red(
`
Help README
---------------------------------------------------------------------------------------------------
LIRI is similar to SIRI in the fact that it can find out information for you. You can check songs, 
movies, define words, check the weather, and check your twitter feed. I will be adding more skills 
later on. But enjoy your experience with LIRI.
Here is how to use LIRI:
---------------------------------------------------------------------------------------------------
When you run the liri.js file using the console. You just have to type the following into the
terminal:
node liri.js <ACTION> <ARGUMENTS>
node liri.js prompt
node liri.js my-tweets
node liri.js spotify-this-song <ARGUMENTS>
node liri.js movie-this <ARGUMENTS>
node liri.js get-weather <ARGUMENTS>
node liri.js count-to <ARGUMENTS>
node liri.js do-what-it-says
The <ACTION> is what you need LIRI to do, and the <ARGUMENTS> are the parameters that you need to 
pass to LIRI to get what you are looking for. The <ARGUMENTS> will change determine on what you are
looking for.
Examples:
node liri.js get-tweets
  This will return your last 20 tweets that you have tweeted.
node liri.js spotify-this-song "Money Pink Floyd"
  This will return the song titled Money by Pink Floyd and will also give the artist, album, and a URL that
  will give you a 30 second preview of the song.
node liri.js movie-this Guardians of the Galaxy
  This will return a movie with the title Guardians of the Galaxy and give you a quick synopsis of the movie and 
  a link where there to find out more information about the movie.
`)); // end template string
} // end help()
function about(){
  console.log(
`
${chalk.red("Welcome to the LIRI bot")} 
${chalk.green("Version 1.0.3")}
${chalk.blue("  -by Mark Evans")}
${chalk.red("Pull from official repo: https://github.com/shopglobal/liri")}
${chalk.red("       ___      _    __          __ ")} 
${chalk.green("      / (_)____(_)  / /_  ____  / /")} 
${chalk.blue("     / / / ___/ /  / __ \/ __ \/ __/ ")} 
${chalk.red("    / / / /  / /  / /_/ / /_/ / /  ")} 
${chalk.green("   /_/_/_/  /_/  /_.___/\____/\__/  ")} 
`); // end chalk board
} // end about()
function status(){
  console.log(
`
${chalk.red("Welcome to the LIRI bot")} 
${chalk.green("Version 1.0.3")}
${chalk.blue("  -by Mark Evans")}
${chalk.blue(" Status: Operational")}
${chalk.red("       ___      _    __          __ ")} 
${chalk.green("      / (_)____(_)  / /_  ____  / /")} 
${chalk.blue("     / / / ___/ /  / __ \/ __ \/ __/ ")} 
${chalk.red("    / / / /  / /  / /_/ / /_/ / /  ")} 
${chalk.green("   /_/_/_/  /_/  /_.___/\____/\__/  ")} 
`); // end chalk board
} // end status()
function init(){
  console.log(
`
${chalk.red("Welcome to the LIRI bot")} 
${chalk.green("Version 1.0.3")}
${chalk.blue("  -by Mark Evans")}
${chalk.blue(" Status: Initialized")}
${chalk.red("       ___      _    __          __ ")} 
${chalk.green("      / (_)____(_)  / /_  ____  / /")} 
${chalk.blue("     / / / ___/ /  / __ \/ __ \/ __/ ")} 
${chalk.red("    / / / /  / /  / /_/ / /_/ / /  ")} 
${chalk.green("   /_/_/_/  /_/  /_.___/\____/\__/  ")} 
`); // end chalk board
} // end init()
function terminate(){
  console.log(
`
${chalk.red("Welcome to the LIRI bot")} 
${chalk.green("Version 1.0.3")}
${chalk.blue("  -by Mark Evans")}
${chalk.blue(" Status: Processes terminated")}
${chalk.red("       ___      _    __          __ ")} 
${chalk.green("      / (_)____(_)  / /_  ____  / /")} 
${chalk.blue("     / / / ___/ /  / __ \/ __ \/ __/ ")} 
${chalk.red("    / / / /  / /  / /_/ / /_/ / /  ")} 
${chalk.green("   /_/_/_/  /_/  /_.___/\____/\__/  ")} 
`); // end chalk board
} // end terminate()
function log(input){
  console.log(chalk.green(input));
  fs.appendFile("logs.txt",(input + `\n`));
} //end log()

function getTweets(){
  fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used tweets()\n"));
  Keys.get('statuses/user_timeline', params, function(err, tweets,response){
    if(err){
      return log(err);
    }// end if()

    if(response.statusCode === 200) {
      for(i = 0; i < tweets.length; i++){
        var counter = i + 1;
        var text = tweets[i].text;
        var time = tweets[i].created_at;
        log(`Tweet ${counter}: At ${time} you tweeted "${text}"`)
      } // end for()
    } // end if
  }); //end feed
} //end tweets()

function getSong(input){
  fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used song()\n"));
//     for (var i = 3; i < songParam.length; i++){
//     if(i > 3 && i < songParam.length){
//         song = song + "+" + songParam[i];
//         //console.log(song);
//     } else{
//         song += songParam[i];
//     }
// }    

    // if (!song){
    //         song = "The Sign Ace of Base";
    //     }

var spotify = new Spotify({
    id: '6efecb35f43b4d9cb327658373d85422',
    secret: '3fd0f14a7f454af4888311b0a7689167'
  });
  
  spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
        console.log(chalk.green("Album: " + data.tracks.items[0].album.name)); 
        console.log(chalk.green("Artist: " + data.tracks.items[0].artists[0].name));
        console.log(chalk.green("Song: " + data.tracks.items[0].name));
        console.log(chalk.green("Preview Link: " + data.tracks.items[0].preview_url));
        console.log(chalk.green("Track: " + data.tracks.items[0].external_urls.spotify));
      var response = data.tracks.items[0];

      var artist = response.artists[0].name;
      var title = response.name;
      var album = response.album.name;
      var url = response.preview_url;
      log(`You searched Spotify for: ${song}
---We searched the web, here is what was found---
The song ${song} was performed by ${artist}.
${artist} released this song on the album "${album}".
You can listen to ${song} here - ${url}`);
   }
}); // end spotify.search()
// end spotifySong()
}


function getMovie(){
fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used movie()\n"));
for (var input = 3; input < movieParam.length; input++){
        if(input > 3 && input < movieParam.length){
        movieName = movieName + "+" + movieParam[input];
        console.log(chalk.red("____________________________________"));
        console.log(chalk.red("------------------------------------"));
        console.log(chalk.red("this is movieName " + movieName));
    }   
        else{
        movieName += movieParam[input];
        }
    }
        var movie = movieName

        if (!movie){
            movie = "Mr Nobody";
        }
        console.log(chalk.blue(movie));
        var movie_url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece"
        console.log(chalk.blue(movie_url));
            url = movie_url;
            request(movie_url, function(error, response, body){

                if(error){
                    return error;
                }
          
                  if(!error && response.statusCode == "200"){

          
                    var movie = JSON.parse(body);
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Title: " + movie.Title));
                    title = movie.Title;
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Year: " + movie.Year));
                    year = movie.Year;
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Imdb Rating:" + movie.imdbRating));
                    imdbRating = movie.imdbRating;
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    // console.log("\n")
                    // console.log("Rotten Tomatoes Rating: " +JSON.parse(body).Ratings[0].Value)
                    console.log("\n");
                    console.log(chalk.green("Rotten Tomatoes Rating: " + movie.Ratings[0].Value));
                    rottenRating = movie.Ratings[0].Value;
                    rated = ((imdbRating) + " & " + (rottenRating));
                    country = movie.Country;
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Language: " + movie.Language));
                    language = movie.Language;
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Movie Plot: " + movie.Plot));
                    plot = movie.Plot;
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Actors: " + movie.Actors));
                    actors = movie.Actors;
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));

                    log(`You have searched for ${title} and here is what I have found:
${title} (${rated}) was released in ${year}.
This movie was released in ${country} in ${language} and featured ${actors}.
A quick plot of the film is:
  ${plot}
Critic Ratings for ${title}:
  IMDB: ${imdbRating}
  Rotten Tomatoes: ${rottenRating}
To learn more about this film you can visit 
  ${url}`);
                  }
                })


    }




function getWeather(input){
  fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used weather() searching " + input + "\n"));
  var city = input;
  weather.find({search: input, degreeType: "F"}, function(err, result){
    if(err){
      console.log(err);
    } else {
      var pretty = JSON.stringify(result, null, 2);
      var data = result[0].current;
      var temp = data.temperature;
      var time = data.observationtime;
      var city = data.observationpoint;
      var wind = data.winddisplay;
      var humidity = data.humidity;
      log(`Looking up the weather, near by ${city}, they checked the weather there at ${time} their time and here is what they got.
    The current weather is :
         Temperature: ${temp}
            Humidity: ${humidity}
        Current Wind: ${wind}`)
    }// end if()
  }); // end weather.find()
} // end weather()

//console.log('myArgs: ', myArgs);


function countTo(input){
  fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used countTo() to count up to " + input + "\nHere I go..."));
  var target = parseInt(input);
  if(target > 0){
    for(i=0; i<target; i++){
      console.log((i+1));
    } // end for()
    var balance = target * 0.01;
    log(`Since I did ${target} calculations, your server usage balance is $${balance}.
  I have not been integrated with a credit card machine, Apple Pay, Google Pay, or Venmo API's yet, so I only accept cash.
  Sorry for the inconvenience.`)
  } else {
    log("Please enter a number above 0!")
  } // if if/else()
} // end count

function random(){
  fs.readFile("random.txt", "utf8", function(err, data){
    if(err){
      log(err);
    } else{
      var dataArr = data.split(",");
      var numRandom = Math.floor(Math.random() * dataArr.length);
      var keyCheck;
      var keyRandom;

            
      if(numRandom % 2 === 0){
        keyCheck = true;
        keyRandom = numRandom;
      } else {
        keyCheck = false;
        keyRandom = numRandom - 1;
      } // end if/else()
      var valToKey = keyRandom + 1;
      // Determine which function this random action wants to run, and then run the respective value
      if(dataArr[keyRandom] === "spotify-this-song"){
        song = dataArr[1];
                console.log(dataArr[1]);
                getSong();
      } else if(dataArr[keyRandom] === "movie-this"){
        movie = dataArr[1];
                console.log(dataArr[1]);
                getMovie();
      } 
      // else if(dataArr[keyRandom] === "weather-this"){
      //   city = dataArr[1];
      //           console.log(dataArr[1]);
      //           getWeather();
      // } // end if/else()
    } // end if/else()
  }) // end fs.readFile
} // end random()

if (myArgs == "tweets"){
Keys.get('statuses/user_timeline', params, function(error, tweets, response){
        if (error) {
            console.log(error);
        } else{
            for (var t = 0; t < tweets.length; t++){
                console.log(chalk.green("Tweet: " + tweets[t].text));
                console.log(chalk.green("Created at: " + tweets[t].created_at));
            }
            
            //console.log(tweets.text)
        }
    })
}
if (myArgs == "my-tweets"){
Keys.get('statuses/user_timeline', params, function(error, tweets, response){
        if (error) {
            console.log(error);
        } else{
            for (var t = 0; t < tweets.length; t++){
                console.log(chalk.green("Tweet: " + tweets[t].text));
                console.log(chalk.green("Created at: " + tweets[t].created_at));
            }
            
            //console.log(tweets.text)
        }
    })
}
if (myArgs == "tweets-by"){
Keys.get('statuses/user_timeline', params, function(error, tweets, response){
        if (error) {
            console.log(error);
        } else{
            for (var t = 0; t < tweets.length; t++){
                console.log(chalk.green("Tweet: " + tweets[t].text));
                console.log(chalk.green("Created at: " + tweets[t].created_at));
            }
            
            //console.log(tweets.text)
        }
    })
}
if (myArgs == "get-tweets"){
Keys.get('statuses/user_timeline', params, function(error, tweets, response){
        if (error) {
            console.log(error);
        } else{
            for (var t = 0; t < tweets.length; t++){
                console.log(chalk.green("Tweet: " + tweets[t].text));
                console.log(chalk.green("Created at: " + tweets[t].created_at));
            }
            
            //console.log(tweets.text)
        }
    })
}
if(myArgs == "spotify"){

for (var i = 3; i < songParam.length; i++){
    if(i > 3 && i < songParam.length){
        song = song + "+" + songParam[i];
        //console.log(song);
    } else{
        song += songParam[i];
    }
}    

if (!song){
            song = "The Sign Ace of Base";
        }

var spotify = new Spotify({
    id: '6efecb35f43b4d9cb327658373d85422',
    secret: '3fd0f14a7f454af4888311b0a7689167'
  });
  
  spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
        console.log(chalk.red(data.tracks));
        console.log(chalk.green("Album: " + data.tracks.items[0].album.name)); 
        console.log(chalk.green("Artist: " + data.tracks.items[0].artists[0].name));
        console.log(chalk.green("Song: " + data.tracks.items[0].name));
        console.log(chalk.green("Preview Link: " + data.tracks.items[0].preview_url));
        console.log(chalk.green("Track: " + data.tracks.items[0].external_urls.spotify));
    }
  });
}
if(myArgs == "song"){

for (var i = 3; i < songParam.length; i++){
    if(i > 3 && i < songParam.length){
        song = song + "+" + songParam[i];
        //console.log(song);
    } else{
        song += songParam[i];
    }
}    

if (!song){
            song = "The Sign Ace of Base";
        }

var spotify = new Spotify({
    id: '6efecb35f43b4d9cb327658373d85422',
    secret: '3fd0f14a7f454af4888311b0a7689167'
  });
  
  spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
        console.log(chalk.green("Album: " + data.tracks.items[0].album.name)); 
        console.log(chalk.green("Artist: " + data.tracks.items[0].artists[0].name));
        console.log(chalk.green("Song: " + data.tracks.items[0].name));
        console.log(chalk.green("Preview Link: " + data.tracks.items[0].preview_url));
        console.log(chalk.green("Track: " + data.tracks.items[0].external_urls.spotify));
    }
  });
}
if(myArgs == "spotify-this-song"){

for (var i = 3; i < songParam.length; i++){
    if(i > 3 && i < songParam.length){
        song = song + "+" + songParam[i];
        //console.log(song);
    } else{
        song += songParam[i];
    }
}    

if (!song){
            song = "The Sign Ace of Base";
        }

var spotify = new Spotify({
    id: '6efecb35f43b4d9cb327658373d85422',
    secret: '3fd0f14a7f454af4888311b0a7689167'
  });
  
  spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
        console.log(chalk.green("Album: " + data.tracks.items[0].album.name)); 
        console.log(chalk.green("Artist: " + data.tracks.items[0].artists[0].name));
        console.log(chalk.green("Song: " + data.tracks.items[0].name));
        console.log(chalk.green("Preview Link: " + data.tracks.items[0].preview_url));
        console.log(chalk.green("Track: " + data.tracks.items[0].external_urls.spotify));
    }
  });
}

// cleaning things up, and adding in a default movieName if none is provided by user

// var movieParam = process.argv;
// var movieName = "";

    switch(keyword){
        case 'movie':
        for (var input = 3; input < movieParam.length; input++){
        if(input > 3 && input < movieParam.length){
        movieName = movieName + "+" + movieParam[input];
        console.log("____________________________________");
        console.log("------------------------------------");
        console.log("\n");
        console.log("this is movieName " + movieName);
    }   
        else{
        movieName += movieParam[input];
        }
    }
        var movie_title = movieName

        if (!movie_title){
            movie_title = "Mr Nobody";
        }

        var movie_url = "http://www.omdbapi.com/?t=" + movie_title + "&y=&plot=short&apikey=40e9cece"
        console.log(movie_url)

            request(movie_url, function(error, response, body){

                if(error){
                    return error;
                }
          
                  if(!error && response.statusCode == "200"){

          
                    var movie = JSON.parse(body);
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Title: " + movie.Title));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Year: " + movie.Year));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Imdb Rating:" + movie.imdbRating));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    // console.log("\n")
                    // console.log("Rotten Tomatoes Rating: " +JSON.parse(body).Ratings[0].Value)
                    console.log("\n");
                    console.log(chalk.green("Rotten Tomatoes Rating: " + movie.Ratings[0].Value));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Language: " + movie.Language));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Movie Plot: " + movie.Plot));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Actors: " + movie.Actors));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                  }
                })
        break;

    }
switch(keyword){
        case 'movie-this':
        for (var input = 3; input < movieParam.length; input++){
        if(input > 3 && input < movieParam.length){
        movieName = movieName + "+" + movieParam[input];
        console.log(chalk.green("____________________________________"));
        console.log(chalk.green("------------------------------------"));
        console.log("\n");
        console.log(chalk.green("this is movieName " + movieName));
    }   
        else{
        movieName += movieParam[input];
        }
    }
        var movie_title = movieName

        if (!movie_title){
            movie_title = "Mr Nobody";
        }

        var movie_url = "http://www.omdbapi.com/?t=" + movie_title + "&y=&plot=short&apikey=40e9cece"
        console.log(movie_url)

            request(movie_url, function(error, response, body){

                if(error){
                    return error;
                }
          
                  if(!error && response.statusCode == "200"){

          
                    var movie = JSON.parse(body);
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Title: " + movie.Title));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Year: " + movie.Year));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Imdb Rating:" + movie.imdbRating));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    // console.log("\n")
                    // console.log("Rotten Tomatoes Rating: " +JSON.parse(body).Ratings[0].Value)
                    console.log("\n");
                    console.log(chalk.green("Rotten Tomatoes Rating: " + movie.Ratings[0].Value));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Language: " + movie.Language));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Movie Plot: " + movie.Plot));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                    console.log("\n");
                    console.log(chalk.green("Actors: " + movie.Actors));
                    console.log(chalk.green("____________________________________"));
                    console.log(chalk.green("------------------------------------"));
                  }
                })
        break;

    }
    
    if(!myArgs) {
        myArgs = "prompt";
    }
if(myArgs == "prompt") {
    //-------- Prompt user for input-------------------------------------------------

inquirer
  .prompt([
    {
      type: "list",
      message: "Please select",
      choices: [
        "Read Mark Evans Tweets",
        "Get Information about a song from Spotify",
        "Get information about a movie from OMDB",
        "Trigger a Random Reaction",
        "Get Information about the Weather",
        "Count up to"
      ],
      name: "whichAction"
    },
    {
      type: "input",
      message: "Enter the name of a song: ",
      name: "song",
      when: function(answers) {
        return answers.whichAction === "Get Information about a song from Spotify";
      }
    },
    {
      type: "input",
      message: "Please enter the name of a movie: ",
      name: "movie",
      when: function(answers) {
        return answers.whichAction === "Get information about a movie from OMDB";
      }
    },
    {
      type: "input",
      message: "Please enter the name of a city: ",
      name: "search",
      when: function(answers) {
        return answers.whichAction === "Get Information about the Weather";
      }
    },
    {
      type: "input",
      message: "Please enter a number you would like me to count up to: ",
      name: "count",
      when: function(answers) {
        return answers.whichAction === "Count up to";
      }
    }        
  ])
  .then(function(user) {
    var action = user.whichAction;
    var currentdate = new Date(); // used to set date information when writing to log.txt


var lookup = {
      //--------------Logging to log.txt---------------------

      logTime:
        "Log entry created on " +
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds(),

      log: function(thingToLog) {
        fs.appendFile("log.txt", thingToLog, function(error) {
          if (error) console.log(chalk.red("error"));
        });
      },

      //----------------- TWITTER ----------------------------

      "Read Mark Evans Tweets": function() {
        var params = { screen_name: "_devmark", count: "20" };
        Keys.get("statuses/user_timeline", params, function(error, tweets) {
          if (!error) {
            for (var i = 0; i < tweets.length; i++) {
              console.log("\n" + tweets[i].created_at);
              console.log(chalk.green(tweets[i].text + "\n"));
              lookup.log(
                "\n" +
                  lookup.logTime +
                  "\n" +
                  "Posted on " +
                  tweets[i].created_at +
                  "\n" +
                  tweets[i].text +
                  "\n"
              );
            }
          }
        });
      },

      //----------------- SPOTIFY ----------------------------

      "Get Information about a song from Spotify": function() {
        var spotify = new Spotify({
            id: '6efecb35f43b4d9cb327658373d85422',
            secret: '3fd0f14a7f454af4888311b0a7689167'
        });        
        if (!user.song) {
          user.song = "THE SIGN ace of base";
        }
        spotify.search({ type: "track", query: user.song, limit: 1 }, function(
          err,
          data
        ) {
          if (err) {
            console.log("Error occurred" + err);
            return;
          }
          // console.log(JSON.stringify(data, null, 2));    //test prints the full Spotify return JSON object
          for (var i = 0; i < data.tracks.items.length; i++) {
            song = data.tracks.items[0];
            var songLog =
              "\nThe song " +
              song.name.toUpperCase() +
              " is by the artist " +
              song.artists[0].name.toUpperCase() +
              "\nThe song appears on the album " +
              song.album.name.toUpperCase() +
              "\nTo preview on Spotify, command+click the link below: \n\n" +
              song.preview_url +
              "\n";
            console.log(chalk.green(songLog));
            lookup.log("\n \n" + lookup.logTime + songLog);
          }
        });
      },

      //----------------- Weather ----------------------------
    "Get Information about the Weather": function() {
        console.log(chalk.green("Let's take a look at weather."));
            var search = user.search;
            getWeather(search);
      },

      //----------------- Counter ----------------------------
    "Count up to": function() {
    var count = user.count;
            countTo(count);

      },

      //----------------- OMDB ----------------------------

      "Get information about a movie from OMDB": function() {
        if (!user.movie) {
          user.movie = "Mr. Nobody";
        }
        var queryURL =
          "http://www.omdbapi.com/?t=" +
          user.movie +
          "&y=&plot=short&apikey=40e9cece";
        request(queryURL, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            movie = JSON.parse(body);
            var movieLog =
              "\nThe movie title is " +
              movie.Title.toUpperCase() +
              "\nThe film was released in " +
              movie.Year +
              "\nIt's IMBD Rating is " +
              movie.imdbRating +
              "\nThe film was produced in " +
              movie.Country +
              "\nThe film's language is " +
              movie.Language +
              "\nThe plot of the movie is " +
              movie.Plot +
              "\nActors in the movie include " +
              movie.Actors +
              "\nOfficial Website is " +
              movie.Website +
              "\n";
            console.log(chalk.green(movieLog));
            lookup.log("\n \n" + lookup.logTime + movieLog);
            // console.log(response);   logs full JSON response
          }
        });
      },

      //----------------- RANDOM ----------------------------

      "Trigger a Random Reaction": function() {
        fs.readFile("random.txt", "UTF8", function(error, data) {
          // action = data[0];
          // user.song = data[1];
            var dataArr = data.split(',');
                      if (dataArr[0] === 'spotify-this-song') {
                song = dataArr[1];
                console.log(dataArr[1]);
                getSong();
            }
          // lookup[action]();
        });
      }
}; // End of lookup object
""
    //-----------------query the lookup Object with the action property selected by user---------

    lookup[action]();
  });
}

var colors = require("colors/safe");
var prompt = require('prompt'); 
if(myArgs == "fly"){
    prompt.message = colors.rainbow("Question!");
    prompt.delimiter = colors.green("><");
        
        var schema = {
        properties: {
            origin: {
                pattern: /^[a-zA-Z\s-]+$/,
                message: 'Name must be only letters, spaces, or dashes',
                required: true
    },
        date: {
            date: 'date',
            format: 'date',
            message: 'Must be a valid date format YY-MM-DD'
    },
    //     anyInputIWant: {
    //         required: true,
    //         hidden: true
    // }
  }
};
// Start the prompt
    prompt.start();
//     // alert("Please enter your username and email address: ");   
//     // prompt.get(['username', 'email'], function (err, result) {
//     prompt.get({
//     properties: {
//     name: {
//       description: colors.red("What is your name?")
//     }
//   }
// }, 
prompt.get(schema, function (err, result) {
    console.log(chalk.green('Command-line input received:'));
    console.log(chalk.green("____________________________________"));
    console.log(chalk.green("------------------------------------"));
    console.log("\n");
    // console.log('  username: ' + result.username);
    // console.log('  email: ' + result.email);
    console.log(chalk.green('  origin: ' + result.origin));
    console.log(chalk.green('  date: ' + result.date));
      if(err){
            throw error;
        } else{
            // console.log(data);
            console.log(result);
        }
    })
}



if(myArgs == "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            throw error;
        } else {
            var dataArr = data.split(",");
            if (dataArr[0] === 'spotify-this-song') {
                song = dataArr[1];
                console.log(dataArr[1]);
                getSong();
            }
            if (dataArr[0] === 'movie-this') {
                movie = dataArr[1];
                console.log(dataArr[1]);
                getOmdb();
            }
        }
    })
}

// if(argumentArray == "do-what-it-says"){
//     fs.readFile("random.txt", "utf8", function(error, data){
//         if(error){
//             throw error;
//         } else {
//             var dataArray = data.split(",");
//             if (dataArray[0] === 'spotify-this-song') {
//                 songName = dataArray[1];
//                 console.log(dataArray[1]);
//                 getSpotify();
//             }
//         }
//     })
// }

// function prompt(){
//   inquire
//     .prompt([
//       {
//         type: "list",
//         message: "What would you like to do?",
//         choices: ["Look at my tweets", "Check weather somewhere", "Count up to", "Check info on a song", "Check info on a movie"],
//         name: "choice"
//       } // end questions
//     ]) // end inquire.prompt()
//     .then(function(response){
//       var rc = response.choice;
//       if(rc === "Look at my tweets"){
//         tweets();
//       }else if(rc === "Check weather somewhere"){
       
//         inquire
//           .prompt([
//             {
//               type: "input",
//               message: "Where would you like to search the weather?",
//               name: "search"
//             } // end questions()
//           ]) // end inquire.prompt()
//           .then(function(response){
//             console.log(chalk.green("look at weather."));
//             var search = response.search;
//             getWeather(search);
//           }); // end .then()
//       }else if(rc === "Count up to"){
//         inquire
//           .prompt([
//             {
//               type: "input",
//               message: "How high should I count?",
//               name: "count"
//             } // end questions()
//           ]) // end inquire.prompt{}
//           .then(function(response){
//             var count = response.count;
//             countTo(count);
//           }); // end .then()
//       }else if(rc === "Check info on a song"){
//         inquire
//           .prompt([
//             {
//               type: "input",
//               message: "What song should we look up?",
//               name: "song"
//             } // end questions{}
//           ]) // end inquire.prompt()
//           .then(function(response){
//             var song = response.song;
//             getSong(song);
//           }) // end .then
//       } else if(rc === "Check info on a movie"){
//         inquire
//           .prompt([
//             {
//               type: "input",
//               message: "What movie should we look up?",
//               name: "movie"
//             } // end questions()
//           ]) // end inquire.prompt()
//           .then(function(response){
//             var movie = response.movie;
//             console.log(movie);
//             getMovie();
//           }) // end inquire.prompt()
//       } else {
//         console.log(chalk.green("I should add this to the the function."));
//       } // end if/else()
//     }) // end then()
// } // end prompt()

//log commands to log.txt file
function getLogText(){
    // logging the commands 
    var temp2 = ""
    for(p=2; p<nodeArray.length; p++){
        temp2 = temp2 + " " + nodeArray[p].trim();
    };
    return temp2.trim();
    console.log(chalk.green("Content Added!"));
    console.log("--------------------");
    // logging the movie names
    var temp3 = ""
    for(p=2; p<movieParam.length; p++){
        temp3 = temp3 + " " + movieParam[p].trim();
    };
    return temp3.trim();
    console.log(chalk.green("Content Added!"));
    console.log("--------------------");
    // logging the song names
    var temp4 = ""
    for(p=2; p<songParam.length; p++){
        temp4 = temp4 + " " + songParam[p].trim();
    };
    return temp4.trim();
    console.log(chalk.green("Content Added!"));
    console.log("--------------------");
    // logging the twitter username requested
    var temp5 = ""
    for(p=2; p<tweets.length; p++){
        temp5 = temp5 + " " + tweets[p].text.trim();
    };
    return temp5.trim();
    console.log(chalk.green("Content Added!"));
    console.log("--------------------");
    // logging the tweet
    var temp6 = ""
    for(t = 0; t < prompt.length; t++){
        temp6 = temp6 + " " + prompt[t].value.trim();
    };
    return temp6.trim();
    console.log(chalk.green("Content Added!"));
    console.log("--------------------");
};

var logText = '\r\n' + getLogText();

fs.appendFile("log.txt", logText, function(err){

   if(err){
    return console.log(chalk.green(err));
  } 

  
});