const mysql = require('mysql');

module.exports = (app, isLoggedIn) => {
  app.get('/api/users/clock', (req, res) => {
    if (req.isAuthenticated()) {
      const uSql = 'SELECT COUNT(*) as count FROM `user_time_log` WHERE `u_id` = ? AND `logout` IS NULL';
      const sql = mysql.format(uSql, [req.user.idusers]);
      app.pool.query(sql, (error, result) => {
        res.send({ clock: result });
      });
    } else {
      res.send({ authenicated: false });
    }
  });
  app.post('/api/users/clock-in', isLoggedIn, (req, res) => {
    // Check if user already clocked in
    const uSql = 'SELECT `u_id`, `login`, `logout` FROM `user_time_log` WHERE `u_id` = ? AND `logout` IS NULL';
    const sql = mysql.format(uSql, [req.user.idusers]);
    app.pool.query(sql, (error, result) => {
      // if not then clock user in
      if (result.length === 0) {
        const uClockInSql = 'INSERT INTO `user_time_log`(`u_id`, `login`) VALUES (?,NOW())';
        const clockInSql = mysql.format(uClockInSql, [req.user.idusers]);
        app.pool.query(clockInSql, (errors, results) => {
          res.send({ results });
        });
        // else tell the user that they are already clocked in
      } else {
        res.send({ response: 'failure' });
      }
    });
  });
  app.post('/api/users/clock-out', isLoggedIn, (req, res) => {
    const uSql = 'SELECT `u_id`, `login`, `logout` FROM `user_time_log` WHERE `u_id` = ? AND `logout` IS NULL';
    const sql = mysql.format(uSql, [req.user.idusers]);
    app.pool.query(sql, (error, result) => {
      // if not then clock user out
      if (result.length > 0) {
        const uClockOutSql = 'UPDATE `user_time_log` SET `logout`=NOW() WHERE `u_id` = ? AND `logout` IS NULL';
        const clockOutSql = mysql.format(uClockOutSql, [req.user.idusers]);
        app.pool.query(clockOutSql, (errors, results) => {
          res.send({ results });
        });
        // else tell the user that they are already clocked out
      } else {
        res.send({ response: 'failure' });
      }
    });
  });
};
