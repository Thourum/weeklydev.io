module.exports = {
	method: 'GET',
	path: '/survey',
	handler: (req, res) => {
		res({
			success: true,
			message: "Here we will see all surveys"
		});
	}
}
