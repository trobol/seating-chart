const mysql = require('mysql');

module.exports = (app) => {
  app.get('/api/users/get-projects', (req, res) => {
    if (req.isAuthenticated()) {
      const sql = mysql.format('SELECT `projects`.`project` FROM `projects` INNER JOIN `user_projects` ON `user_projects`.`p_id` = `projects`.`idprojects` WHERE `user_projects`.`u_id` = ?;', [req.user.idusers]);
      app.pool.query(sql, (error, results) => {
        if (error) { res.send({ error }); }
        const projects = results.map(p => (p.project));
        res.send({ projects });
      });
    } else {
      res.send({});
    }
  });
};
