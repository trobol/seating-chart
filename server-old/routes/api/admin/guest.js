
module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets guests info
  app.get('/api/admin/guests/', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
};
