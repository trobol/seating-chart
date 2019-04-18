const mysql = require('mysql');

module.exports = (app) => {
  app.get('/api/users/get-majors', (req, res) => {
    if (req.isAuthenticated()) {
      const sql = ''; // Get majors api call
    } else {
      res.send({});
    }
  });
};
