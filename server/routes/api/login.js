module.exports = (app, isLoggedIn, passport) => {
  app.post('/login', passport.authenticate('local-login',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    }),
  (req, res) => {
    res.redirect('/');
  });
};
