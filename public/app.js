//mport { StringDecoder } from "string_decoder";

//Get the articles as JSON

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
})