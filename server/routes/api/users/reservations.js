const mysql = require('mysql');
const moment = require('moment');

module.exports = (app, isLoggedIn) => {
  // Gets All Reservation Info
  app.get('/api/users/reservations', isLoggedIn, (req, res) => {
    const sql = 'SELECT r.idreservations as id, r.s_id as "seat", u.name, u.idusers as uid, r.weekday, r.start, r.end, r.expires, r.reason FROM `reservations` as r INNER JOIN `users` as u ON r.u_id = u.idusers';
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.send({ response: error });
      res.send({ results, fields });
    });
  });
  app.get('/api/users/reservations/today', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      const date = moment();
      const weekday = date.isoWeekday();
      const sql = mysql.format(`
      SELECT r.idreservations as rid, r.u_id as uid, s_id as sid, r.weekday, r.start, r.end, r.expires, r.reason 
      FROM reservations as r 
      WHERE u_id=? AND weekday=? AND expires > ?`, [user.idusers, weekday, date.format('YYYY-MM-DD HH:mm:ss')]);
      app.pool.query(sql, (error, result) => {
        if (error) res.send({ error });
        else res.send({ reservation: result[0] });
      });
    } else {
      res.send({ authenicated: false });
    }
  });
  // Get all reservations for current user
  app.get('/api/users/reservations/', (req, res) => {
    if (req.isAuthenticated()) {
      const { idusers } = req.user;
      const sql = mysql.format('SELECT `idreservations` as rid, `u_id` as uid, `s_id` as sid, weekday, start, end, expires, reason FROM reservations WHERE u_id=? AND expires > NOW()', [idusers]);
      app.pool.query(sql, (error, result) => {
        if (error) res.send({ error });
        else res.send({ result });
      });
    } else {
      res.send({ authenicated: false });
    }
  });
  // Post new reservations
  app.post('/api/users/reservations/', (req, res) => {
    if (req.isAuthenticated()) {
      const uSql = 'INSERT INTO `reservations`(`s_id`, `u_id`, `weekday`, `start`, `end`, `expires`, `reason`) VALUES (?,?,?,?,?,?,?)';
      const {
        sid, weekday, start, end, expires, reason,
      } = req.query;
      if (![sid, weekday, start, end, expires, reason]
        .filter(e => e === null && e === undefined).length) {
        const expiration = new Date(expires);
        const { idusers } = req.user;
        const sql = mysql.format(uSql, [sid, idusers, weekday, start, end, expiration, reason]);
        app.pool.query(sql, (error, results) => {
          if (error) res.send({ error });
          else res.send({ results });
        });
      } else {
        res.send({ response: 'failure' });
      }
    } else {
      res.send({ authenicated: false });
    }
  });
  // Delete Reservation
  app.post('/api/users/reservations/:reservationId', (req, res) => {
    if (req.isAuthenticated()) {
      const { reservationId } = req.params;
      const { idusers } = req.user;
      const sql = mysql.format('DELETE FROM reservations WHERE idreservations=? AND u_id=?', [reservationId, idusers]);
      app.pool.query(sql, (error, result) => {
        if (error) res.send({ error });
        else res.send({ result });
      });
    } else {
      res.send({ authenicated: false });
    }
  });
};
