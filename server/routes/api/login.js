module.exports = (app, passport) => {
  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }), (req, res) => {
    console.log(req.data);

    res.redirect('/');
  });

  app.get('/login', (req, res) => {
    res.render('login', { messages: req.flash('loginMessage') });
  });
};
