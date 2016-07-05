module.exports = {
  method: 'GET',
  path: '/',
  config: {
    auth: false
  },
  handler: (req, res) => {
    res({
      success: true,
      message: 'Server is running!'
    });
  }
};
