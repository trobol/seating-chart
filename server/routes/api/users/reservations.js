const mysql = require('mysql');
const moment = require('moment');

module.exports = (app) => {
  app.get('/api/user/reservations', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      const date = moment();
      const weekday = date.isoWeekday();
      const sql = mysql.format('SELECT * FROM reservations WHERE u_id=? AND weekday=? AND expires > ?', [user.idusers, weekday, date.format('YYYY-MM-DD HH:mm:ss')]);
      app.pool.query(sql, (error, result) => {
        if (error) res.send({ error });
        else res.send({ result });
      });
    } else {
      res.send({ authenicated: false });
    }
  });
};
