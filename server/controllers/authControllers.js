const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { registerValidation, loginValidation } = require('../validation');
const Artist = require('../models/Artist');

dotenv.config();

const registerController = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const emailExists = await Artist.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('Email already registered');
    }
    try {
        const hashedPassword = await bcrypt.hash(
            req.body.password,
            await bcrypt.genSalt(10)
        );
        const artist = new Artist({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const savedArtist = await artist.save();
        res.send(savedArtist);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const loginController = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const artist = await Artist.findOne({ email: req.body.email });
        if (!artist) {
            return res.status(400).send('Email is not registered');
        }

        const validPass = await bcrypt.compare(
            req.body.password,
            artist.password
        );
        if (!validPass) return res.status(400).send('Wrong password');
        const authToken = jwt.sign(
            { email: artist.email },
            process.env.JWT_SECRET,
            {}
        );
        res.json({ ...artist['_doc'], authToken });
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

module.exports = { registerController, loginController };
