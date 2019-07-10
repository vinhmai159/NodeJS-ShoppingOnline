const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    contents: {
        type: String,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogCategories'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    images: String,
    tags: Array,
    timestamp: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Articles', ArticleSchema);