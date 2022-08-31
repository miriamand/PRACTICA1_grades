var express = require('express');
var router = express.Router();
const { Insertar } = require('../db/mongo');


router.get('/', function (req, res, next) {
  res.render('reg');
});

router.post('/', async function (req, res, next) {

  await Insertar(req.body)
    .then(() => {
      console.log('registrado');

      res.redirect('/');
    })

    .catch(() => {

      console.log('no registrado');

      res.redirect('/reg');

    })

});

router.get('/', function (req, res, next) {
  res.render('dash')
});

module.exports = router;