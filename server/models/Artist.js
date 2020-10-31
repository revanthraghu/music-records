const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255,
        trim: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: 'http://localhost:5000/uploads/default_artist_avatar.png'
    }
});

module.exports = mongoose.model('Artist', userSchema);
