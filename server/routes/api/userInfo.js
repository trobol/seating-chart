const fs = require('fs');

module.exports = (app) => {
  app.get('/api/get-user', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      console.log(user);

      fs.stat(`/static/users/${user.image}.jpg`, (err) => {
        if (err) {
          res.json({ name: user.name, avatar: '/static/users/guest.jpg', authenticated: true });
        } else {
          res.json({ name: user.name, avatar: `/static/users/${user.image}.jpg`, authenticated: true });
        }
      });
    } else {
      res.json({ authenticated: false });
    }
  });
};
