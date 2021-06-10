const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = express();
const port = 5000;

//Enable form data
app.use(express.urlencoded({ extended: false }));
//Enable JSON
app.use(express.json());

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

db.connect((error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('MySQL Connected.');
	}
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
	console.log('Server running on port: ' + port);
});
