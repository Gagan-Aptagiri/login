const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const db = require('./util/db');

const app = express();
const port = 5000;

// Parse URL-encoded bodies ( as sent by HTML Forms) Enable form data
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API Clients) Enable JSON
app.use(express.json());
app.use(cookieParser());

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
