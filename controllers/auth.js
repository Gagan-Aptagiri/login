exports.register = (req, res) => {
	console.log(req.body);
	res.send('Form has been submitted');
};
