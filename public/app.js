//mport { StringDecoder } from "string_decoder";

//Get the articles as JSON

function showArticles(articles){

    $.getJSON("/articles", function(data){
        for (var i = 0; i < data.length; i++) {
    /*         $("#articles").append("<p data-id='"+ data[i]._id + "'>" + data[i].title + "<br/>" + data[i].link + "</p>"); */
            
            var card = $("<div>");
            card.addClass("card");
            card.attr("data-id", data[i]._id);
            $("#articles").append(card);
    
            var cardBody = $("<div>");
            cardBody.addClass("card-body");
            card.append(cardBody);
    
            var cardTitle = $("<h3>");
            cardTitle.addClass("card-title");
            cardTitle.text(data[i].title);
            cardBody.append(cardTitle);
    
            var cardParagraph = $("<p>");
            cardParagraph.addClass("card-text");
            cardParagraph.text(data[i].summary);
            cardBody.append(cardParagraph);
    
            var button = $("<a>");
            button.addClass("btn")
            button.addClass("btn-primary");
            button.attr("href", data[i].link)
            button.text("Full Article");
            cardBody.append(button);
        }
    });    
};

$(document).ready(function(){
    showArticles();
})

$("#scraping").on("click", function(){
    $.get("/scrape").then(function(data){
        showArticles();
        alert("Scraping completed");
    });
});

function clearAll() {
    var clearAll= $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>Looks like we don't have any new articles.</h4>",
        "</div>",
        "<div class='card'>",
        "<div class='card-header text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='card-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // Appending this data to the page
    $("#articles").append(clearAll);
  };



$("#clear").on("click", function(){
    $("#articles").empty();
    clearAll();
})