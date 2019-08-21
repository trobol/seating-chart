const fs = require('fs');
const { Base } = require('../../../util/utility');

module.exports = (app, isLoggedIn) => {
  app.get('/api/seat/', (req, res) => {
    const sql = 'SELECT * FROM seats';
    app.pool.query(sql, (error, result) => {
      if (error) res.status(500).send(error);
      else {
        const seats = result.map(e => ({ sid: e.idseats, uid: e.u_id, computerName: e.computer_name }));
        res.send({ seats });
      }
    });
  });
  app.get('/api/seat/user/', isLoggedIn, (req, res) => {
    const sql = 'SELECT idseats as sid FROM seats WHERE u_id = ?';
    app.pool.query(sql, [req.user.idusers], (error, result) => {
      if (error) res.status(500).send(error);
      else res.send({ seat: result });
    });
  });
  app.get('/api/seat/reservations', (req, res) => {
    const sql = `SELECT 
    s.idseats as sid, s.u_id as suid, s.computer_name as computerName,
    r.idreservations as rid, r.u_id as uid, r.weekday, r.start, r.end, r.expires, r.reason,
    u.image, u.name
    FROM seats as s 
    LEFT JOIN reservations as r ON s.idseats = r.s_id
    LEFT JOIN users as u ON u.idusers = r.u_id
    WHERE 1`;
    app.pool.query(sql, (error, result) => {
      if (error) res.status(500).send(error);
      else {
        const seats = result.reduce((acc, {
          sid, uid, computerName, suid, rid, start, end, expires, reason, image, name, weekday,
        }) => ({
          ...acc,
          [sid]: {
            sid,
            computerName,
            suid,
            name,
            path: fs.existsSync(`${Base}/static/users/${image}.jpg`) ? `/static/users/${image}.jpg` : '/static/users/guest.jpg',
            reservation: acc[sid] ? [...acc[sid].reservation, {
              rid, uid, start, end, expires, reason, weekday,
            }] : [{
              rid, uid, start, end, expires, reason, weekday,
            }],
          },
        }), {});
        res.send({ seats });
      }
    });
  });
};
