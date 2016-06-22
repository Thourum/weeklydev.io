var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next)
{
  res.render('pages/index', { title: "Welcome to Weekly Dev" });
});


module.exports = router;