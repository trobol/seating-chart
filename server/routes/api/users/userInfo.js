const fs = require('fs');

module.exports = (app) => {
  app.get('/api/users/get-user', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;

      fs.stat(`/static/users/${user.image}.jpg`, (err) => {
        if (err) {
          user.image = '/static/users/guest.jpg';
          res.send({ user, authenticated: true });
        } else {
          user.image = `/static/users/${user.image}.jpg`;
          res.send({ user, authenticated: true });
        }
      });
    } else {
      res.json({ authenticated: false });
    }
  });
};
