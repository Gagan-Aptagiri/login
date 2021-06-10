const bcrypt = require('bcryptjs');

const db = require('../util/db');

exports.register = (req, res) => {
	const { name, email, password, passwordConfirm } = req.body;

	db.query(
		'SELECT email from users WHERE email = ? ',
		[email],
		async (error, results) => {
			if (error) {
				console.log(error);
			}
			if (results.length > 0) {
				return res.render('register', {
					message: 'Email is already in use',
				});
			} else if (password != passwordConfirm) {
				return res.render('register', {
					message: 'Passwords do not match',
				});
			}
			let hashedPassword = await bcrypt.hash(password, 8);

			db.query(
				'INSERT into users SET ? ',
				{
					name: name,
					email: email,
					password: hashedPassword,
				},
				(error, results) => {
					if (error) {
						console.log(error);
					} else {
						return res.render('register', {
							message: 'User registered',
						});
					}
				},
			);
		},
	);
};
