
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: true
    },
    name: {
        type: String,
        //required: true
    },
    image: String,
    amounts: {
        type: Number,
        default: 0,
    },
    colors: {
        type: Array,
    },
    sizes: {
        type: Array,
        //enum: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    },
    genders: {
        type: Array,
        //enum: ['male', 'female', 'boy', 'girl', 'sale'],
    },
    price: {
        type: Number,
        trim: true,
        //default: {$nin: null},
    },
    salePrice: {
        type: Number,
        trim: true,
        default: null,
    },
    sale: {
        type: Number,
        default: 0,
    },
    hot: {
        type: Number,
        default: 0,
    },
    categories: [{
        type:  Schema.Types.ObjectId,
        ref: 'Categories',
        default: null,
    }],
    timestamp: {
        type: Date,
        default: Date.now
    },
    
} );

module.exports = mongoose.model('Products', ProductSchema);
