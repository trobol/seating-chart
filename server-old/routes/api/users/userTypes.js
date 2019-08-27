
module.exports = (app) => {
  app.get('/api/users/user-types', (req, res) => {
    app.pool.query('SELECT * FROM `user_type`', (error, results) => {
      res.send({ userType: results });
    });
  });
};
