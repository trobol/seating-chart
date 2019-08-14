
const mysql = require('mysql');

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets All Project Info
  app.get('/api/admin/projects(/user)?/', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT `idprojects` as pid,`project`, `name`, `idusers` as uid FROM `projects`'
    + ' INNER JOIN `user_projects` ON `projects`.`idprojects` = `user_projects`.`p_id` '
    + 'INNER JOIN `users` ON `user_projects`.`u_id` = `users`.`idusers` ';
    app.pool.query(sql, (error, results) => {
      if (error) res.send({ response: error });
      else if (req.params[0]) {
        res.send({
          users:
          results.reduce((acc, {
            pid, project, name, uid,
          }) => (acc[uid]
            ? { ...acc, [uid]: { ...acc[uid], projects: [...acc[uid].projects, { project, pid }] } }
            : { ...acc, [uid]: { name, uid, projects: [{ project, pid }] } }), []),
        });
      } else {
        res.send({
          projects:
        results.reduce((acc, {
          pid, project, name, uid,
        }) => (acc[project]
          ? { ...acc, [project]: { ...acc[project], users: [...acc[project].users, { name, uid }] } }
          : { ...acc, [project]: { pid, users: [{ name, uid }] } }), {}),
        });
      }
    });
  });
  // Gets Specific Project Info
  app.get('/api/admin/projects/:projectId', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'SELECT u.`name` FROM `projects` as p INNER JOIN `user_projects` as up ON up.`p_id` = p.`idprojects` INNER JOIN `users` as u ON up.`u_id` = u.`idusers` WHERE p.`idprojects`=?';
    const { pid } = req.body;
    const sql = mysql.format(uSql, [pid]);
    app.pool.query(sql, (error, results, fields) => {
      if (error) { res.send({ response: error }); } else {
        res.send({ response: { results, fields } });
      }
    });
  });
  // Posts new project
  app.post('/api/admin/projects/', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'INSERT INTO `projects`(`project`) VALUES (?)';
    const { project } = req.body;
    const sql = mysql.format(uSql, [project]);
    app.pool.query(sql, (error, results, fields) => {
      if (error) { res.send({ response: error }); } else {
        res.send({ response: { results, fields } });
      }
    });
  });
  // Deletes a project
  app.post('api/admin/projects/:projectId', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
};
