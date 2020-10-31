const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../middleware/authenticationToken');
const authenticationToken = require('../middleware/authenticationToken');
const {
    registerController,
    loginController
} = require('../controllers/authControllers');
const {
    addAlbumController,
    getAlbumsController,
    getUserAlbumsController,
    updateProfileController,
    deleteAlbumController
} = require('../controllers/artistControllers');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/albums', getAlbumsController);
router.use(authenticationToken);
router.get('/user/albums', getUserAlbumsController);
router.post('/addalbum', addAlbumController);
router.put('/updateprofile', updateProfileController);
router.delete('/deletealbum', deleteAlbumController);

module.exports = router;
