const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchemas = new Schema({
    contents: {
        type: String,
        trim: true,
        default: null,
    },
    like: {
        type: Number,
        default: 0,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    Product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Comments', CommentSchemas);