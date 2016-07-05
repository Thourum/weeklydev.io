module.exports = {
  method: 'GET',
  path: '/submissions',
  handler: (req, res) => {
    res({
      success: true,
      message: 'Here we will see all submission'
    });
  }
};
