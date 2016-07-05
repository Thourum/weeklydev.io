module.exports = {
  method: 'GET',
  path: '/teams',
  handler: (req, res) => {
    res({
      success: true,
      message: 'Here we will see all teams'
    });
  }
};
