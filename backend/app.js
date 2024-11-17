const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const adminRoute = require('./routes/coursRouter');
const userRoute = require('./routes/user');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/uploads', express.static('uploads'));

app.use(adminRoute);
app.use(userRoute);


mongoose.connect('mongodb+srv://originalmc223:KrDHs4nba2vuzVRQ@cluster0.htl3g.mongodb.net/expertlablearning')
    .then((connexion) => {
        console.log("Connexion réussie à MongoDB");
        app.listen(5000, () => console.log('Serveur démarré sur le port 5000'));
    })
    .catch((error) => {
        console.log("Erreur de connexion à MongoDB:", error);
    });
