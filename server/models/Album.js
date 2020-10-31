const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    name: { type: String, required: true, default: 'Unknown' },
    year: { type: String, required: true, default: 'Unknown' },
    genre: { type: String, required: true, default: 'Unknown' },
    artist: { type: String, required: true, default: 'Unkown' },
    email: { type: String, required: true },
    songs: { type: Array, required: true, default: [] },
    albumArt: {
        type: String,
        required: true,
        default: 'http://localhost:5000/uploads/default_album_art.png'
    }
});

module.exports = mongoose.model('albums', albumSchema);
