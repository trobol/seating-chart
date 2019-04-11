module.exports = (app, passport) => {
  app.post('/login', passport.authenticate('local-login',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    }),
  (req, res) => {
    console.log('hey');
    res.redirect('/');
  });

  app.get('/login', (req, res) => {
    if (req.isAuthenticated()) { res.redirect('/'); }
  });
};
