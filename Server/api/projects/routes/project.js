module.exports = {
	method: 'GET',
	path: '/api/projet',
	handler: (req, res) => {
		res({
			success: true,
			message: "Here we will see all projects"
		});
	}
}
