const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchemas = new Schema({
    contents: {
        type: String,
        trim: true,
        default: null,
    },
    rate: {
        type: String,
        enum: ['1','2','3','4','5'],
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

module.exports = mongoose.model('Reports', ReportSchemas);