const mysql = require('mysql');

module.exports = (app, isLoggedIn) => {
  app.post('/api/seat/take/', isLoggedIn, (req, res) => {
    const { seat } = req.body;
    const id = req.user.idusers;
    const date = new Date();
    const day = date.getDay();
    const checkSeat = 'SELECT `u_id` FROM `seats` WHERE `idseats` = ?;';
    const reservations = 'SELECT * FROM `reservations` WHERE `s_id`=? AND `weekday`=?;';
    const updateSeat = (results, seatID, userID = 1) => {
      const update = 'UPDATE `seats` SET `u_id`=? WHERE `idseats`=?;';
      const updatesql = mysql.format(update, [userID, seatID]);
      app.pool.query(updatesql, (err) => {
        if (err) {
          results.send({ reponse: err });
        }
        results.send({ response: 'success' });
      });
    };
    if (seat != null) {
      const checkSeatValues = [seat];
      const sql = mysql.format(checkSeat, checkSeatValues);
      app.pool.query(sql, (error, results) => {
        if (error) { res.send({ reponse: error }); }
        // Checks  if seat is currently empty
        if (results[0].u_id === null) {
          const reservationsValues = [seat, day];
          const reservationSql = mysql.format(reservations, reservationsValues);
          app.pool.query(reservationSql, (err, result) => {
            if (err) { res.send({ response: err }); }
            // Returns a list of reservations
            result.forEach((row) => {
              const ss = row.start.split(':');
              const es = row.end.split(':');
              const s = new Date(date.getFullYear(), date.getMonth(),
                date.getDate(), ss[0], ss[1], ss[2], 0); // Start of the shift
              const e = new Date(date.getFullYear(), date.getMonth(),
                date.getDate(), es[0], es[1], es[2], 0); // End of the shift
              const ex = new Date(row.expires);
              if (date < ex && Number(row.u_id) === Number(id)) {
                updateSeat(res, seat);
              } else if (s < date && date < e && row.u_id !== id) {
                res.send({ reponse: 'This seat is reserved' });
              }
            });
          });
        } else {
          res.send({ response: 'Seat already selected by another user' });
        }
      });
    } else {
      console.log('No seat has been selected');
    }
  });
};
