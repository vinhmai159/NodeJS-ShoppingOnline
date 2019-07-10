const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categories: String,
    parentCategories: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.model('Categories', CategorySchema);