const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

dotenv.config();

const app = express();

app.use(cors());

//username: musixrec
//password: v7OudCWQS8rVw8aO

mongoose.connect(
    process.env.MONGO_URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to database');
        }
    }
);

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api', apiRoutes);

app.listen(5000, () => {
    console.log('Server live on port 5000');
});
