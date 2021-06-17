const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).render('login', {
				message: 'Please provide an email and password',
			});
		}

		db.query(
			'SELECT * FROM users where email = ?',
			[email],
			async (error, results) => {
				console.log(results);
				if (
					!results ||
					!(await bcrypt.compare(password, results[0].password))
				) {
					res.status(401).render('login', {
						message: 'Email or Password is incorrect',
					});
				} else {
					const id = results[0].id;

					const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
						expiresIn: process.env.JWT_EXPIRES_IN,
					});

					console.log('The token is: ' + token);

					const cookieOptions = {
						expires: new Date(
							Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
						),
						httpOnly: true,
					};

					res.cookie('jwt', token, cookieOptions);
					res.status(200).redirect('/');
				}
			},
		);
	} catch (error) {
		console.log(error);
	}
};
