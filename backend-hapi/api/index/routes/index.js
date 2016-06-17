module.exports = {
	method: 'GET',
	path: '/',
	handler: (req, res) => {
		res({
			success: true,
			message: "Server is running!"
		});
	}
}
