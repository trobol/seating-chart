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
        if (filtered.length < 1 || filtered === undefined) {
          const insertReservationsSql = mysql.format(
            'INSERT INTO `reservations`(`s_id`, `u_id`, `weekday`, `start`, `end`, `expires`, `reason`) VALUES (?,?,?,?,?,?,?)',
            [seat, idusers, weekday, start, end, expires, reason],
          );
          app.pool.query(insertReservationsSql, (e, r) => {
            if (e) throw e;
            res.send({ response: 'success', body: r });
          });
        } else {
          res.send({ response: 'Reservation already exists at that time!!' });
        }
      });
    } else {
      res.send({ response: 'Something was not set!' });
    }
  });
  // GET Request sends all current active reservations for a seat
  app.get('/api/seat/reserve', (req, res) => {
    const { seat } = req.query;
    const getReservationSql = mysql.format('SELECT * FROM `reservations` WHERE `reservations`.`s_id` = ? AND `reservations`.`expires` > NOW();', [seat]);
    app.pool.query(getReservationSql, (err, result) => {
      res.send({ response: result });
    });
  });
  // TODO: Delete Request
  app.delete('/api/seat/reserve', (req, res) => {
    console.log(req, res);
  });
};
