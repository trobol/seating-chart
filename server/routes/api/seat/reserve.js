const mysql = require('mysql');

<<<<<<< HEAD
module.exports = (app) => {
  app.get('/api/seat/reserve/', (req, res) => {
    const getReservationsSql = mysql.format('SELECT * FROM `reservations` WHERE `reservations`.`s_id` = ?', [1]);
    app.pool.query(getReservationsSql, (error, result) => {
      if (error) { res.send({ response: error }); }
      // res.send({ response: result });
    });
    res.send({ response: 'get success' });
=======
module.exports = (app, isLoggedIn) => {
  app.post('/api/seat/reserve/', isLoggedIn, (req, res) => {
    res.send({ response: 'success' });
  });
  app.get('/api/seat/reserve', (req, res) => {
    res.send({ response: 'success' });
>>>>>>> e2ef48c4f201742fdbb25b7deabd108e646d0c7e
  });
  /* app.post('/api/seat/reserve/', isLoggedIn, (req, res) => {
    res.send({ response: 'post success' });
  }); */
};
