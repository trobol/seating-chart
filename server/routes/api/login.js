module.exports = (app, isLoggedIn, isAdmin, passport) => {
  app.post('/login', passport.authenticate('local-login',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    }),
  (req, res) => {
    res.redirect('/');
  });
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
