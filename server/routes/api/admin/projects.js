
const mysql = require('mysql');

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets All Project Info
  app.get('/api/admin/projects/', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT `project`, FROM `projects`';
    app.pool.query(sql, (error, results, fields) => {
      if (error) throw error;
      res.send(results, fields);
    });
    res.send({ response: 'failure' });
  });
  // Gets Specific Project Info
  app.get('/api/admin/projects/:projectId', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'SELECT u.`name` FROM `projects` as p INNER JOIN `user_project` as up ON up.`p_id` = p.`idprojects` INNER JOIN `users` as u ON up.`u_id` = u.`idusers` WHERE p.`idprojects`=?';
    const { pid } = req.body;
    const sql = mysql.format(uSql, [pid]);
    app.pool.query(sql, (error, results, fields) => {
      if (error) throw error;
      res.send({ response: { results, fields } });
    });
    res.send({ response: 'failure' });
  });
  // Posts new project
  app.post('/api/admin/projects/', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'INSERT INTO `projects`(`project`) VALUES (?)';
    const { project } = req.body;
    const sql = mysql.format(uSql, [project]);
    app.pool.query(sql, (error, results, fields) => {
      if (error) throw error;
      res.send({ response: { results, fields } });
    });
    res.send({ response: 'failure' });
  });
  // Deletes a project
  app.post('api/admin/projects/:projectId', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
};
