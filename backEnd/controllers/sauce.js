const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.thing);
	delete sauceObject._id;
	const sauce = new Thing({
	  ...sauceObject,
	  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	thing.save()
	  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
	  .catch(error => res.status(400).json({ error }));
  };
