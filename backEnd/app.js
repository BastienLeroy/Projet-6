const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const helmet = require("helmet");
const xss = require('xss-clean')

const authRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');


mongoose.connect('mongodb+srv://Bastos:Gunblade31@cluster0.wj4lg.mongodb.net/Piquante?retryWrites=true&w=majority', //chemin d'accées pour connect à la DB
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
 


const app = express();
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(xss());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;
