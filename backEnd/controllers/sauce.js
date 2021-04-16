const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
	
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
		likes: 0,
		dislikes: 0,
		usersLiked: [],
		usersDisliked: [],
	});
	
	sauce.save()
		.then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
		.catch(error => res.status(400).json({ error }));

};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file 
	? {
		...JSON.parse(req.body.sauce),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		}
	: { ...req.body };

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

exports.like = async (req, res, next) => {
	if (req.body.like === 1) {
		const sauce = await Sauce.findOne({ _id: req.params.id });
		const userIdExist = sauce.usersLiked.find(userId => userId === req.body.userId);
	
		if (typeof userIdExist === "undefined") {
			sauce.usersLiked = [...sauce.usersLiked, req.body.userId];
			sauce.likes = parseInt(sauce.likes + 1);

			try {
				const sauceSaved = await sauce.save();
				res.status(200).json(sauceSaved);
			} catch (err) {
				res.status(404).json({error: err});
			}
		}
	}

	if (req.body.like === 0) {
		const sauce = await Sauce.findOne({ _id: req.params.id });

		const newUsersLiked = sauce.usersLiked.filter(userId => {
			return userId !== req.body.userId;
		});
		const newUsersDisliked = sauce.usersDisliked.filter(userId => {
			return userId !== req.body.userId;
		});

		sauce.usersLiked = newUsersLiked;
		sauce.usersDisliked = newUsersDisliked;
		sauce.likes = parseInt(newUsersLiked.length);
		sauce.dislikes = parseInt(newUsersDisliked.length);

		try {
			const sauceSaved = await sauce.save();
			res.status(200).json(sauceSaved);
		} catch (err) {
			res.status(404).json({error: err});
		}
	}

	if (req.body.like === -1) {
		const sauce = await Sauce.findOne({ _id: req.params.id });
		const userIdExist = sauce.usersDisliked.find(userId => userId === req.body.userId);
	
		if (typeof userIdExist === "undefined") {
			sauce.usersDisliked = [...sauce.usersDisliked, req.body.userId];
			sauce.dislikes = parseInt(sauce.dislikes + 1);

			try {
				const sauceSaved = await sauce.save();
				res.status(200).json(sauceSaved);
			} catch (err) {
				res.status(404).json({error: err});
			}
		}
	}
};
