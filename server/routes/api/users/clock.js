const mysql = require('mysql');

module.exports = (app, isLoggedIn) => {
  app.get('/api/users/clock', isLoggedIn, (req, res) => {
    const uSql = 'SELECT COUNT(*) as count WHERE `u_id` = ? AND `logout`=NULL';
    const sql = mysql.format(uSql, [req.user.idusers]);
    app.pool.query(sql, (error, result) => {
      res.send({ result });
    });
  });
  app.post('/api/users/clock-in', isLoggedIn, (req, res) => {
    // Check if user already clocked in
    const uSql = 'SELECT `u_id`, `login`, `logout` FROM `user_time_log` WHERE `u_id` = ? AND `logout`=NULL';
    const sql = mysql.format(uSql, [req.user.idusers]);
    app.pool.query(sql, (error, result) => {
      // if not then clock user in
      console.log({ result });
      if (result.length === 0) {
        res.send({ response: 'success' });
        const uClockInSql = 'INSERT INTO `user_time_log`(`u_id`, `login`) VALUES (?,NOW())';
        const clockInSql = mysql.format(uClockInSql, [req.user.idusers]);
        app.pool.query(clockInSql, (errors, results) => {
          res.send({ results }).redirect('/');
        });
        // else tell the user that they are already clockin
      } else {
        res.send({ response: 'failure' }).redirect('/');
      }
    });
  });
  app.post('/api/users/clock-out', isLoggedIn, (req, res) => {
    const uSql = 'SELECT `u_id`, `login`, `logout` FROM `user_time_log` WHERE `u_id` = ? AND `logout`=NULL';
    const sql = mysql.format(uSql, [req.user.idusers]);
    app.pool.query(sql, (error, result) => {
      // if not then clock user in
      console.log({ result });
      if (result.length === 1) {
        res.send({ response: 'success' });
        const uClockOutSql = 'UPDATE `user_time_log` SET `logout`=NOW() WHERE `u_id` = ? AND `logout`=NULL';
        const clockOutSql = mysql.format(uClockOutSql, [req.user.idusers]);
        app.pool.query(clockOutSql, (errors, results) => {
          res.send({ results }).redirect('/');
        });
        // else tell the user that they are already clockin
      } else {
        res.send({ response: 'failure' }).redirect('/');
      }
    });
  });
};
