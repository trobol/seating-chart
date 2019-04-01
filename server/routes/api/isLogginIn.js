const mysql = require('mysql');

module.exports = (app) => {
  app.get('/api/logged-in', (req, res) => {
    // Checks if a user is logged in via the database
  });
};
