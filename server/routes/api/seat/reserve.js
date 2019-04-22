const mysql = require('mysql');

module.exports = (app) => {
  app.get('/api/seat/reserve/', (req, res) => {
    const getReservationsSql = mysql.format('SELECT * FROM `reservations` WHERE `reservations`.`s_id` = ?', [1]);
    app.pool.query(getReservationsSql, (error, result) => {
      if (error) { res.send({ response: error }); }
      // res.send({ response: result });
    });
    res.send({ response: 'get success' });
  });
  /* app.post('/api/seat/reserve/', isLoggedIn, (req, res) => {
    res.send({ response: 'post success' });
  }); */
};
