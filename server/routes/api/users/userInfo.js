const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

const base = path.resolve('.');
// { multipleStatements: true }
module.exports = (app) => {
  app.get('/api/users/get-user', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      // fs.stat takes in a absolute path not relative
      // therefore we need to give it the base
      fs.stat(`${base}/static/users/${user.image}.jpg`, (err) => {
        if (err) {
          user.path = '/static/users/guest.jpg';
          res.send({ user, authenticated: true });
        } else {
          user.path = `/static/users/${user.image}.jpg`;
          res.send({ user, authenticated: true });
        }
      });
    } else {
      res.json({ authenticated: false });
    }
  });
  app.post('/api/users/edit/', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      const {
        passwordReset, password, newPassword, major, userType, project,
      } = req.body;
      res.send({ user, authenticated: true });
    } else {
      res.send({ authenticated: false });
    }
  });
};
