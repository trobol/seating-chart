const mysql = require('mysql');

module.exports = (app, isLoggedIn) => {
  app.get('/api/users/activity/', isLoggedIn, (req, res) => {
    const sql = mysql.format('SELECT `log`.* FROM `log` INNER JOIN `log_users` ON `log_users`.`log_id` = `log`.`idlog` WHERE `log_users`.`u_id` = ? ORDER BY `log`.`idlog` DESC', [req.user.idusers]);
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ error });
      else res.send({ activity: result });
    });
  });
};
