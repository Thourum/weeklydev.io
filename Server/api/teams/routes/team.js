module.exports = {
	method: 'GET',
	path: '/api/team',
	handler: (req, res) => {
		res({
			success: true,
			message: "Here we will see all teams"
		});
	}
}
