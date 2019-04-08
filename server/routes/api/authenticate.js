const mysql = require('mysql');

module.exports = (app) => {
  app.post('/api/auth', app.passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/',
  }), (req, res) => {
    console.log('hello');

    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect('/admin');
  });
};
