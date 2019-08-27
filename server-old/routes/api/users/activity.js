const mysql = require('mysql');
const { isValidPath, Base } = require('../../../util/utility');


module.exports = (app, isLoggedIn) => {
  app.get('/api/users/activity/', isLoggedIn, (req, res) => {
    const sql = mysql.format('SELECT `log`.* FROM `log` INNER JOIN `log_users` ON `log_users`.`log_id` = `log`.`idlog` WHERE `log_users`.`u_id` = ? ORDER BY `log`.`idlog` DESC LIMIT 10', [req.user.idusers]);
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ error });
      else {
        const logs = result.map(async (log) => {
          if (await isValidPath(`${Base}/static/users/${log.image}.jpg`)) {
            return { ...log, image: `/static/users/${log.image}.jpg` };
          }
          return { ...log, image: '/static/users/guest.jpg' };
        });
        Promise.all(logs).then((results) => {
          res.send({ result: results });
        });
      }
    });
  });
};
