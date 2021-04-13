const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

	console.log(sauceObject);
	console.log(sauceObject._id);


	//delete sauceObject._id;

	
	const sauce = new Sauce({
	  ...sauceObject,
	  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	
	sauce.save()
	  .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
	  .catch(error => res.status(400).json({ error }));

};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
	{
	...JSON.parse(req.body.sauce),
	imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	} : { ...req.body };

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
	  .then(thing => {
		const filename = thing.imageUrl.split('/images/')[1];
		fs.unlink(`images/${filename}`, () => {
			Sauce.deleteOne({ _id: req.params.id })
				.then(() => res.status(200).json({ message: 'Objet supprimé !'}))
				.catch(error => res.status(400).json({ error }));
		});
	  })
	  .catch(error => res.status(500).json({ error }));
  };

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error: error}));
    };
    
    
exports.getAllSauce = (req, res, next) => {
	Sauce.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error: "error"}));
};