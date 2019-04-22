/**
 * Discontinuing change in favor of just using take and return
 */
const mysql = require('mysql');
const axios = require('axios');

module.exports = (app, isLoggedIn) => {
  app.post('/api/seat/change/', isLoggedIn, (req, res) => {
    const { returnSeat, takeSeat } = req.body;
    const id = req.user.idusers;
    const update = 'UPDATE `seats` SET `u_id`=NULL WHERE `idseats`=?; SELECT `u_id` FROM `seats` WHERE `idseats` = ?; UPDATE `seats` SET `u_id`=? WHERE `idseats`=?;';
    if (returnSeat != null && takeSeat != null && id != null) {
      const sql = mysql.format(update, [returnSeat, takeSeat]);
      axios.post('/take/', { seat: takeSeat }, (err, result) => {
        if (err) { res.send({ reponse: result.reponse }); }
        if (result.response === 'success') {
          app.pool.query(sql, (error) => {
            if (error) { res.send({ reponse: error }); }
            res.send({ reponse: 'success' });
          });
        } else { res.send({ reponse: result.reponse }); }
      });
    } else {
      res.send({ reponse: 'No Seat Selected' });
    }
  });
};
