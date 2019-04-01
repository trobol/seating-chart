const mysql = require('mysql');

module.exports = (app) => {
  app.post('/api/seat/take/', (req, res) => {
    const seat = 1;// req.body.seat;
    const select = 'SELECT `u_id` FROM `seats` WHERE `idseats` = ?';
    // const update = 'UPDATE `seats` SET `u_id`=? WHERE `idseats`=?';
    if (seat != null) {
      const selects = [seat];
      const sql = mysql.format(select, selects);
      app.pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        console.log(results);
      });
    } else {
      console.log('No seat has been selected');
    }
  });
};
