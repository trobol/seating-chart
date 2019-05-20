const fs = require('fs');
const path = require('path');

const base = path.resolve('.');

module.exports = (app) => {
  app.get('/api/users/get-user', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      // fs.stat takes in a absolute path not relative
      // therefore we need to give it the base
      fs.stat(`${base}/static/users/${user.image}.jpg`, (err) => {
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
