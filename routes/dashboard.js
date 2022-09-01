var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard');
});


module.exports = router;