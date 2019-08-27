const mysql = require('mysql');

module.exports = (app, isLoggedIn, isAdmin) => {
  app.post('/api/seat/return/', isLoggedIn, (req, res) => {
    const { seat } = req.body;
    const update = 'UPDATE `seats` SET `u_id`=NULL WHERE `idseats`=?';
    if (seat != null) {
      const sql = mysql.format(update, [seat]);
      app.pool.query(sql, (error) => {
        if (error) {
          res.send({ response: error });
        } else {
          res.send({ response: 'success' });
        }
      });
    } else {
      res.send({ response: 'No Seat Selected' });
    }
  });
  app.post('/api/seat/force(-all)?/', isLoggedIn, isAdmin, (req, res) => {
    if (req.params[0] === '-all') {
      console.log(req.params);
      const sql = 'UPDATE `seats` SET `u_id`=NULL WHERE `u_id` IS NOT NULL';
      app.pool.query(sql, (error) => {
        if (error) {
          res.send({ response: error });
        } else {
          res.send({ response: 'success' });
        }
      });
    } else {
      const { seat } = req.body;
      const update = 'UPDATE `seats` SET `u_id`=NULL WHERE `idseats`=?';
      if (seat != null) {
        const sql = mysql.format(update, [seat]);
        app.pool.query(sql, (error) => {
          if (error) {
            res.send({ response: error });
          } else {
            res.send({ response: 'success' });
          }
        });
      } else {
        res.send({ response: 'No Seat Selected' });
      }
    }
  });
};
