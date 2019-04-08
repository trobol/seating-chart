const mysql = require('mysql');

module.exports = (app) => {
  app.post('/api/seat/take/', (req, res) => {
    const seat = 1;// req.body.seat;
    const select = 'SELECT `u_id` FROM `seats` WHERE `idseats` = ?';
    if (seat != null) {
      const selects = [seat];
      const sql = mysql.format(select, selects);
      app.pool.query(sql, (error, results) => {
        if (error) throw error;
        if (results[0].u_id === null) {
          const update = 'UPDATE `seats` SET `u_id`=? WHERE `idseats`=?';
          const updatesql = mysql.format(update, [1, seat]);
          app.pool.query(updatesql, (err, result) => {
            if (err) throw err;
            console.log({ result });
            res.send({ response: 'success' });
          });
        } else {
          res.send({ response: 'Seat already selected' });
        }
      });
    } else {
      console.log('No seat has been selected');
    }
  });
};
