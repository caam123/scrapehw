//mport { StringDecoder } from "string_decoder";

//Get the articles as JSON

$.getJSON("/articles", function(data){
    for (var i = 0; i < data.length; i++) {
        $("#articles").append(card);
/*         $("#articles").append("<p data-id='"+ data[i]._id + "'>" + data[i].title + "<br/>" + data[i].link + "</p>"); */
        
        var card = $("<div>");
        card.addClass("card-title");
        card.attr("data-id", data[i]._id);

        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        card.append(cardBody);

        var cardTitle = $("<h3>");
        cardTitle.addClass("card-title");
        cardTitle.text(data[i].title);
        cardBody.append(cardTitle);

        var button = $("<a>");
        button.addClass("bt btn-primary");
        button.attr("href", data[i].link)
        button.text("See more");
        cardBody.append(button);
    }
})