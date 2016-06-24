module.exports = {
	method: 'GET',
	path: '/api/survey',
	handler: (req, res) => {
		res({
			success: true,
			message: "Here we will see all surveys"
		});
	}
}
