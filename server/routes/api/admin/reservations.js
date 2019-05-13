const mysql = require('mysql');

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets All Reservation Info
  app.get('/api/admin/reservations/', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT r.s_id as "seat", u.name, weekday, start, end, expires, reason FROM `reservations` as r INNER JOIN `users` as u ON r.u_id = u.idusers';
    app.pool.query(sql, (error, results, fields) => {
      if (error) throw error;
      res.send({ response: { results, fields } });
    });
    res.send({ response: 'failure' });
  });
  // Creates a reservation for a user
  app.post('api/admin/reservations/', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'INSERT INTO `reservations`(`s_id`, `u_id`, `weekday`, `start`, `end`, `expires`, `reason`) VALUES (?,?,?,?,?,?,?,)';
    const {
      sid, uid, weekday, start, end, expires, reason,
    } = req.body;
    if (![sid, uid, weekday, start, end, expires, reason].filter(e => e === null).length) {
      const sql = mysql.format(uSql, [sid, uid, weekday, start, end, expires, reason]);
      app.pool.query(sql, (error, results) => {
        if (error) throw error;
        res.send({ response: results });
      });
    }
    res.send({ response: 'failure' });
  });
  // Deletes a reservation of user
  app.post('api/admin/reservations/:reservationId', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
};
