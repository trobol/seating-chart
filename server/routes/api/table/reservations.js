const mysql = require('mysql');

module.exports = (app) => {
  // Get all reservations
  app.get('/api/table/reservations', (req, res) => {
    const reservationsSql = 'SELECT u.`name`, r.`s_id` as "seat", r.`weekday`,r.`start`,r.`end`,r.`expires`, r.`reason` FROM `reservations` as r INNER JOIN `users` as u ON r.`u_id` = u.`idusers`';
    console.log({ reservationsSql });
    app.pool.query(reservationsSql, (err, results, fields) => {
      console.log({ err, results, fields });
      res.send({ response: { err, results, fields } });
    });
  });
  // Get reservations for individual user
  app.get('/api/table/reservations/user/:userId', (req, res) => {
    console.log(req.params);
    // app.pool.query()
    res.send({ response: req.params });
  });
  // Get reservations for individual seat
  app.get('/api/table/reservations/seat/:seatId', (req, res) => {
    console.log(req.params);
    res.send({ response: req.params });
  });
};
