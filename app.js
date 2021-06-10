const express = require('express');
const path = require('path');

const db = require('./util/db');

const app = express();
const port = 5000;

//Enable form data
app.use(express.urlencoded({ extended: false }));
//Enable JSON
app.use(express.json());

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
