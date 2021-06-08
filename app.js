const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 5000;

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'login',
});

db.connect((error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('MySQL Connected.');
	}
});

app.get('/', (req, res) => {
	res.send('<h1>Hello From Node.js</h1>');
});

app.listen(port, () => {
	console.log('Server running on port: ' + port);
});
