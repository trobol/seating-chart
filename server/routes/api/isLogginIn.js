const mysql = require('mysql');

module.exports = (app) => {
  app.get('/api/logged-in?uid=:uid', (req, res) => {
    // Checks if a user is logged in via the database
    console.log(res);
  });
};
