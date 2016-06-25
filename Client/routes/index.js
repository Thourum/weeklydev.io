var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next)
{
  res.render('pages/index');
});


module.exports = router;