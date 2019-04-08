const mysql = require('mysql');

module.exports = (app) => {
  app.post('/api/seat/return/', (req, res) => {
    const seat = 1;
    const update = 'UPDATE `seats` SET `u_id`=NULL WHERE `idseats`=?';
    if (seat != null) {
      const sql = mysql.format(update, [seat]);
      app.pool.query(sql, (error, results) => {
        if (error) throw error;
        res.send({ reponse: 'success' });
      });
    } else {
      res.send({ reponse: 'No Seat Selected' });
    }
  });
};
