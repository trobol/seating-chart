const mysql = require('mysql');

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets All Reservation Info
  app.get('/api/admin/reservations', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT r.idreservations as id, r.s_id as "seat", u.name, r.weekday, r.start, r.end, r.expires, r.reason FROM `reservations` as r INNER JOIN `users` as u ON r.u_id = u.idusers';
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.send({ response: error });
      res.send({ response: { results, fields } });
    });
  });
  // Creates a reservation for a user
  app.post('/api/admin/reservations', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'INSERT INTO `reservations`(`s_id`, `u_id`, `weekday`, `start`, `end`, `expires`, `reason`) VALUES (?,?,?,?,?,?,?)';
    const {
      sid, uid, weekday, start, end, expires, reason,
    } = req.query;
    if (![sid, uid, weekday, start, end, expires, reason]
      .filter(e => e === null && e === undefined).length) {
      const sql = mysql.format(uSql, [sid, uid, weekday, start, end, expires, reason]);
      app.pool.query(sql, (error, results) => {
        if (error) res.send({ response: error });
        else res.send({ response: results });
      });
    } else {
      res.send({ response: 'failure' });
    }
  });
  // TODO: Deletes a reservation of user
  app.post('/api/admin/reservations/:reservationId', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
};
