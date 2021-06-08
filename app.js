const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
	res.send('<h1>Hello From Node.js</h1>');
});

app.listen(port, () => {
	console.log('Server running on port: ' + port);
});
