const mysql = require('mysql');

module.exports = (app, isLoggedIn) => {
  app.post('/api/seat/reserve/', isLoggedIn, (req, res) => {
    const { idusers } = req.user;
    const {
      seat, weekday, start, end, expires, reason,
    } = req.body;
    if (![seat, weekday, start, end, expires, reason, idusers].filter(e => e === null).length) {
      // If reservation is available
      const getReservationSql = mysql.format(
        'SELECT * FROM `reservations` WHERE `reservations`.`s_id` = ? AND `reservations`.`weekday` = ? AND `reservations`.`expires` > NOW();',
        [seat, weekday],
      );
      app.pool.query(getReservationSql, (err, result) => {
        const filtered = result.filter(r => start <= r.end && end >= r.start);
        res.send({ response: filtered });
        // Then Insert into reservation

        // Else return error
      });
    } else {
      res.send({ response: 'success' });
    }
  });
  app.get('/api/seat/reserve', (req, res) => {
    const { seat } = req.query;
    const getReservationSql = mysql.format('SELECT * FROM `reservations` WHERE `reservations`.`s_id` = ?', [seat]);
    app.pool.query(getReservationSql, (err, result) => {
      res.send({ response: result });
    });
  });
};
