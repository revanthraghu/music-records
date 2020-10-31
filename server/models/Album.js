const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    name: { type: String, required: true, default: 'Unknown' },
    year: { type: String, required: true, default: 'Unknown' },
    genre: { type: String, required: true, default: 'Unknown' },
    artist: { type: String, required: true, default: 'Unkown' },
    songsCount: { type: Number, required: true, default: 0 },
    albumArt: {
        type: String,
        required: true,
        default: 'http://localhost:5000/uploads/default_album_art.png'
    }
});

module.exports = mongoose.model('albumns', albumSchema);
