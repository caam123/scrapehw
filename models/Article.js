var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Schema constructor
var ArticleSchema = new Schema({

    title:{
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    //this allows us to populate the Article with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//IMPORTANT!
// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);
// Export the Article model
module.exports = Article;
