var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var Article = require("./models/Article.js")
var Note = require("./models/Note.js")

var PORT = process.env.PORT || 3000;

var app = express();

//Middleware stuff

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

//Connecting to MongoDB
// Connect to the Mongo DB
//mongoose.connect("mongodb://localhost/scrapingTarea", { useNewUrlParser: true });


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://username:pass123@ds151997.mlab.com:51997/heroku_t97p5825"
mongoose.connect(MONGODB_URI);


// ========================//
//                         //
//         Routes          //
//                         //
// ========================//

//====================
//Route for scraping 
//====================
app.get("/scrape", function(req, res){
    axios.get("https://www.theverge.com/tech").then(function(response){

        var $ = cheerio.load(response.data);

        $("div h2").each(function(i,element){
            var result = {};
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            result.summary = $(element).parent().parent().children("a").children("div").children("img").attr("alt");
            console.log(result.title)
            console.log(result.link);
            console.log("==========================");
            console.log(result.summary);
            console.log("========================");

            console.log(result);

            Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })

        });
        res.send("Scraping Completed");
        window.location.href("../");
    });
});

//=============================================
//Route for getting all articles back from DB! 
//=============================================
app.get("/articles", function(req,res){
    Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

//======================================================
//Route for getting all articles back with ID from DB! 
//======================================================
app.get("/articles/:id", function(req, res){
    Article.findOne({_id: req.params.id})
    .populate("note")
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

//=========================================================
//Route for saving/updating an Article's associated Note
//=========================================================
app.post("/articles/:id", function(req ,res){
    Note.create(req.body)
    .then(function(dbNote){
        return Article.findOneAndUpdate({_id:req.params.id}, {note: dbNote._id}, {new: true});
    })
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});


app.get("/notes", function(req,res){
    Note.find({})
    .then(function(dbNote){
        res.json(dbNote);
    })
    .catch(function(err){
        res.json(err);
    });
});


app.get("/notes/:id", function(req, res){
    Note.findOne({_id: req.params.id})
    .then(function(dbNote){
        res.json(dbNote);
    })
    .catch(function(err){
        res.json(err);
    });
});


app.put("/notes/:id", function(req, res){
    Note.remove({_id: req.params.id})
    .then(function(dbNote){
        res.json(dbNote);
    })
    .catch(function(err){
        res.json(err);
    });
});

//=========================================================
//Starting the server YAY!
//=========================================================

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });



























