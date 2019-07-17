const _ = require('lodash');

module.exports = (app, isLoggedIn) => {
  app.get('/api/seat/', (req, res) => {
    const sql = 'SELECT * FROM seats';
    app.pool.query(sql, (error, result) => {
      if (error) res.status(500).send(error);
      else res.send(result);
    });
  });
  app.get('/api/seat/user/', isLoggedIn, (req, res) => {
    const sql = 'SELECT idseats as sid FROM seats WHERE u_id = ?';
    app.pool.query(sql, [req.user.idusers], (error, result) => {
      if (error) res.status(500).send(error);
      else res.send({ seat: result });
    });
  });
};
