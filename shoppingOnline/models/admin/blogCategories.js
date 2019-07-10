const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogCategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('BlogCategories', BlogCategorySchema);