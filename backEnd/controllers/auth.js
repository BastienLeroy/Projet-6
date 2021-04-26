const bcrypt = require('bcrypt');// requete des differents module
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const passwordRegEx = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})');


exports.signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (passwordRegEx.test(password)) {
      try {
        const emailHash = await bcrypt.hash(email, 10);
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
          email: emailHash,
          password: passwordHash
        })
  
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé !' });
  
      } catch (err) {
        res.status(400).json({ err })// renvoi une erreur si problème rencontrer
      }
    } else {
      res.status(400).json({ message: "Veuillez entrer un mot de passe comprenant au minimum : 1 lettre majuscule et 1 minuscule, 1 chiffre, 1 caractère spécial, 6 caratères"});
    }
};

exports.login = async (req, res, next) => {
  try {
    const userList = await User.find();

    const userValid = await Promise.all(
      userList.map(async user => {
        const compareUser = await bcrypt.compare(req.body.email, user.email);
        
        if(compareUser) {
          const valid = await bcrypt.compare(req.body.password, user.password);

          if(!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });//si MDP non reconnu dans DB alors rencois un message d'erreur
          }
      
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.RANDOM_TOKEN,
              { expiresIn: '24h' }
            )
          });
        }
      })
    )

  } catch (err) {
    console.log("err :", err);
    res.status(500).json({ error: err });
  }
};
