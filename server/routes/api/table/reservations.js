const mysql = require('mysql');

module.exports = (app) => {
  // Get all reservations
  app.get('/api/table/reservations', (req, res) => {
    const reservationsSql = 'SELECT u.`name`, r.`s_id` as "seat", r.`weekday`,r.`start`,r.`end`,r.`expires`, r.`reason` FROM `reservations` as r INNER JOIN `users` as u ON r.`u_id` = u.`idusers`';
    // console.log({ reservationsSql });
    app.pool.query(reservationsSql, (err, results, fields) => {
      // console.log({ err, results, fields });
      res.send({ response: { err, results, fields } });
    });
  });
  // Get reservations for individual user
  app.get('/api/table/reservations/user/:userId', (req, res) => {
    const { userId } = req.params;
    const userSql = 'SELECT u.`name`, r.`s_id` as "seat", r.`weekday`,r.`start`,r.`end`,r.`expires`, r.`reason` FROM `reservations` as r INNER JOIN `users` as u ON r.`u_id` = u.`idusers` WHERE u.`idusers`=?';
    const userReservationSql = mysql.format(userSql, [userId]);
    app.pool.query(userReservationSql, (err, results, fields) => {
      res.send({ response: { err, results, fields } });
    });
  });
  // Get reservations for individual seat
  app.get('/api/table/reservations/seat/:seatId', (req, res) => {
    const { seatId } = req.params;
    const seatSql = 'SELECT u.`name`, r.`s_id` as "seat", r.`weekday`,r.`start`,r.`end`,r.`expires`, r.`reason` FROM `reservations` as r INNER JOIN `users` as u ON r.`u_id` = u.`idusers` WHERE r.`s_id`=?';
    const seatReservationSql = mysql.format(seatSql, [seatId]);
    app.pool.query(seatReservationSql, (err, results, fields) => {
      res.send({ response: { err, results, fields } });
    });
  });
};
