var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

//Middleware stuff

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

//Connecting to MongoDB
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scrapingTarea", { useNewUrlParser: true });


//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrapingTarea";
//mongoose.connect(MONGODB_URI);

//Routes

app.get("/scrape", function(req, res){
    axios.get("https://www.theverge.com/tech").then(function(response){

        var $ = cheerio.load(response.data);

        $("div h2").each(function(i,element){
            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            result.image = $(this).parents().find("image").attr("src");
            console.log(result.title)
            console.log(result.link);
            console.log(result.image)
        });

        res.send("Scraping Completed");

    });

//console.log(result);

});


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });



























