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
    origin: 'https://e-learning-expert-lab-frontend.onrender.com',
    credentials: true
}));

app.use('/uploads', express.static('uploads'));

app.use(adminRoute);
app.use(userRoute);


mongoose.connect('mongodb+srv://originalmc223:KrDHs4nba2vuzVRQ@cluster0.htl3g.mongodb.net/expertlablearning')
    .then((connexion) => {
        console.log("Connexion réussie à MongoDB");
        app.listen('https://e-learning-expert-lab-backend.onrender.com', () => console.log('Serveur démarré avec succèss'));
    })
    .catch((error) => {
        console.log("Erreur de connexion à MongoDB:", error);
    });
