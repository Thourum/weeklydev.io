module.exports = {
	method: 'GET',
	path: '/api/submission',
	handler: (req, res) => {
		res({
			success: true,
			message: "Here we will see all submission"
		});
	}
}
