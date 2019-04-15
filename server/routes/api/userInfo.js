const fs = require('fs');

module.exports = (app) => {
  app.get('/api/get-user', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      console.log(user);

      fs.stat(`/static/users/${user.image}.jpg`, (err, file) => {
        if (err) {
          res.json({ username: user.name, avatar: '/static/users/guest.jpg', authenticated: true });
        } else {
          res.json({ username: user.name, avatar: user.image, authenticated: true });
        }
      });
    } else {
      res.json({ authenticated: false });
    }
  });
};