const Album = require('../models/Album');
const Artist = require('../models/Artist');

const addAlbumController = async (req, res) => {
    const { name, year, genre, artist, songs, email } = req.body;
    const albumExists = await Album.findOne({ name, email });
    if (albumExists) {
        res.status(400).send('Albumn already exists');
    } else {
        try {
            const album = new Album({
                name,
                year,
                genre,
                artist,
                songs,
                email
            });
            const savedAlbum = await album.save();
            res.send(savedAlbum);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

const deleteAlbumController = async (req, res) => {
    const { name, email } = req.body;
    const album = await Album.findOne({ name, email });
    if (!album) {
        res.status(400).send('Albumn not found');
    } else {
        try {
            await Album.deleteOne(album);
            res.send(album);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

const getAlbumsController = async (req, res) => {
    let { page } = req.query;
    page = page || 1;
    try {
        let albums = await Album.find({})
            .skip((page - 1) * 6)
            .limit(6);
        let count = await Album.countDocuments().exec();
        res.status(200).json({ albums, page, count: count });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getUserAlbumsController = async (req, res) => {
    let { page, email } = req.query;
    page = page || 1;
    try {
        if (!email) {
            res.status(400).send('Email query missing in Url');
        } else {
            let albums = await Album.find({ email })
                .skip((page - 1) * 6)
                .limit(6);
            let count = await Album.countDocuments().exec();
            res.status(200).json({ albums, page, count: count });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateProfileController = async (req, res) => {
    const { newName, email } = req.body;
    try {
        const ans = await Artist.updateOne({ email }, { name: newName });
        if (ans.nModified > 0) {
            const artist = await Artist.find({ email });
            res.json(artist);
        } else {
            res.status(400).send('Artist not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    addAlbumController,
    getAlbumsController,
    getUserAlbumsController,
    updateProfileController,
    deleteAlbumController
};
