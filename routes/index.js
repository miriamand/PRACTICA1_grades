var express = require('express');
var { client, dbName, Promedio,collection2,showDataTable} = require('../db/mongo');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcrypt');
var hbs = require('../helpers/help')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { student_id: req.user });
});

passport.use(new LocalStrategy({
  usernameField: "student_id",
  passwordField: "password"
},
  async function (username, password, done) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collection2);
    if (username == "" || password == "") {
      return done(null, false);
    }
    else {
      const user = await collection.findOne({ student_id: username })
      if (!user) {
        client.close();
        return done(null, false);
      } else {
         bcrypt.compare(password, user.password, function (err, res) {
          if (err) {
            console.log(err)
          } else { console.log("inicio",user.student_id)
          return done(null, user); }

        });
      }
    }
  }
));

passport.serializeUser(function (user, done) {
  console.log("listo ser", user.student_id)
  done(null, user.student_id);
});

passport.deserializeUser(async function (id, done) {
  await client.connect();
  const db = client.db(dbName);
  console.log('Connected');
  const collection = db.collection(collection2);
  collection.findOne({ student_id: id }, function (err, user) {
    console.log("listo"+ user)
    done(err, user);
  });
});

router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
  
    res.redirect('/dashboard');
  }
);


router.get('/dashboard', async function (req, res, next) {
 
  await Promedio(Number(req.user.student_id))
  .then((user) => {
    res.render('dashboard', {student_id: req.user.student_id, user: user })
  })
.catch (() => {  console.log("Errores") });

})

router.post('/table',function (req, res, next){
res.redirect('/table')
})

router.get('/table', async function (req, res, next) {
await showDataTable(Number(req.user.student_id))
.then((user) => {
  res.render('table', {student_id: req.user.student_id, user: user })
})
.catch (() => {  console.log("Errores") });

})

module.exports = router;
