const mysql = require('mysql');

module.exports = (app, isLoggedIn) => {
  app.post('/api/seat/return/', isLoggedIn, (req, res) => {
    const { seat } = req.body;
    const update = 'UPDATE `seats` SET `u_id`=NULL WHERE `idseats`=?';
    if (seat != null) {
      const sql = mysql.format(update, [seat]);
      app.pool.query(sql, (error) => {
        if (error) {
          res.send({ response: error });
        }
        res.send({ response: 'success' });
      });
    } else {
      res.send({ response: 'No Seat Selected' });
    }
  });
};
