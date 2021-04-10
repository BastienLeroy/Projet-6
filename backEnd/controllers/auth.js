const bcrypt = require('bcrypt');


exports.signup = (req, res, next) => {
    console.log("req.body signup:", req.body);

    parsedData = JSON.parse(req.body);
    const { email, password } = parsedData;

    bcrypt.hash(password, 10)
        .then(hashPassword => {
            console.log("signup hashPassword :", hashPassword);
        })
        .catch(err => {
            console.log("signup bcrypt error:", err);
        })
};

exports.login = (req, res, next) => {
	console.log("req.body login:", req.body);
};