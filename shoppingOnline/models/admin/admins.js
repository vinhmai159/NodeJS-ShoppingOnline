const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Articles'
    },
    avatar: String,
    age: Number,
    gener: String,
    timestamp: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Admins', AdminSchema);