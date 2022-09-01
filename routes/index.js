var express = require('express');
var {client, dbName} = require('../db/mongo');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

passport.use(new LocalStrategy({
  usernameField: "student_id",
  passwordField: "password"
},

  async function (username, password, done) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('alumnos');
  if(username==""||password==""){
    return done(null, false);}
    else{
    var login = await collection.findOne({ student_id: username })
    if(!login){
      return done(null, false);
    }else{
      bcrypt.compare(password, login.password, function (err, res) {
        if (err) {
          console.log(err)
        } else { return done(null, login); }
        return done(null, false);
      });
    }
  }
}
));

router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/dashboard');
  }
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

// function (err, user) {
      // if (log) { return done(err); }
      // if (!user) { return done(null, false); }

module.exports = router;
