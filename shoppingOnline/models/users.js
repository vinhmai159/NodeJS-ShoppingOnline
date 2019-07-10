const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        min: 6,
    },
    password: {
        type: String,
        max: 30,
        min: 6,
    },
    name: {
        type: String,
    },
    phone: {
        type: Number
    },
    address: {
        type: String,
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Products',
        default: null,
    }],
    roles: {
        type: String,
        enum: [ 'users', 'authors', 'editor', 'admin'],
        default: 'users',
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRound);
    next();
})

module.exports =  mongoose.model('Users', UserSchema);