const mysql = require('mysql');

module.exports = (app, isLoggedIn) => {
  app.post('/api/seat/change/', isLoggedIn, (req, res) => {
    const { returnSeat, takeSeat, id } = req;
    const update = 'UPDATE `seats` SET `u_id`=NULL WHERE `idseats`=?; SELECT `u_id` FROM `seats` WHERE `idseats` = ?; UPDATE `seats` SET `u_id`=? WHERE `idseats`=?;';
    if (returnSeat != null && takeSeat != null && id != null) {
      // const sql = mysql.format(update, [returnSeat, takeSeat, ]);
      app.pool.query(sql, (error) => {
        if (error) { res.send({ reponse: error }); }
        res.send({ reponse: 'success' });
      });
    } else {
      res.send({ reponse: 'No Seat Selected' });
    }
  });
};
