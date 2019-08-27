const mysql = require('mysql');

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets All Reservation Info
  app.get('/api/admin/reservations', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT r.idreservations as id, r.s_id as "seat", u.name, u.idusers as uid, r.weekday, r.start, r.end, r.expires, r.reason FROM `reservations` as r INNER JOIN `users` as u ON r.u_id = u.idusers';
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.send({ response: error });
      res.send({ results, fields });
    });
  });
  // Creates a reservation for a user
  // TODO: Validate that the new reservation doesn't over lap with any other
  //       reservations and that the user doesn't have a prexisting reservation
  //       during that time period at another computer
  app.post('/api/admin/reservations', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'INSERT INTO `reservations`(`s_id`, `u_id`, `weekday`, `start`, `end`, `expires`, `reason`) VALUES (?,?,?,?,?,?,?)';
    const {
      sid, uid, weekday, start, end, expires, reason,
    } = req.query;
    if (![sid, uid, weekday, start, end, expires, reason]
      .filter(e => e === null && e === undefined).length) {
      const expiration = new Date(expires);
      const sql = mysql.format(uSql, [sid, uid, weekday, start, end, expiration, reason]);
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
    const { reservationId } = req.params;
    const sql = mysql.format('DELETE FROM reservations WHERE idreservations=?', [reservationId]);
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ error });
      else {
        res.send({ result });
      }
    });
  });

  app.get('/api/admin/reservations/u/:userId', isLoggedIn, isAdmin, (req, res) => {
    const { userId } = req.params;
    const sql = mysql.format(
      'SELECT r.idreservations as id, r.s_id as "seat", u.name, r.weekday, r.start, r.end, r.expires, r.reason '
    + 'FROM `reservations` as r INNER JOIN `users` as u ON r.u_id = u.idusers '
    + 'WHERE u.idusers = ?; ', [userId],
    );
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ error });
      else {
        res.send({ result });
      }
    });
  });
};
