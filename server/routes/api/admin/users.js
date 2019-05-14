const mysql = require('mysql');

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets timesheets info for a user
  app.get('/api/admin/users/', isLoggedIn, isAdmin, (req, res) => {
    const { uid } = req.body;
    const uSql = 'SELECT `idtime_log`, `u_id`, `login`, `logout` FROM `user_time_log` WHERE u_id=?';
    const sql = mysql.format(uSql, [uid]);
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.send({ response: error });
      res.send({ response: { results, fields } });
    });
  });
  // Posts new user
  app.post('/api/admin/users/', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'INSERT INTO `users`(`name`, `pronoun`, `email`, `username`, `image`, `primary_phone`, `account_created`) VALUES (?,?,?,?,?,?,?,NOW())';
    const {
      name, pronoun, email, username, image, primaryPhone,
    } = req.body;
    if (![name, pronoun, email, username, image, primaryPhone].filter(e => e === null).length) {
      const sql = mysql.format(uSql, [name, pronoun, email, username, image, primaryPhone]);
      app.pool.query(sql).then((error, results) => {
        if (error) throw error;
        res.send({ response: results });
      });
    }
    res.send({ response: 'failure' });
  });
  // Gets info for individual user
  app.get('api/admin/users/:userId', isLoggedIn, isAdmin, (req, res) => {
    const { uid } = req.body;
    const uSql = 'SELECT * FROM `users` WHERE idusers = ?';
    const sql = mysql.format(uSql, uid);
    app.pool.query(sql, (error, results, fields) => {
      if (error) throw error;
      res.send({ response: { results, fields } });
    });
  });
  // Edit/Update User;
  app.post('api/admin/users/edit/:userId', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'UPDATE `users` SET `name`=?,`pronoun`=?,`email`=?,`username`=?,`image`=?,`wiw_id`=?,`primary_phone`=?,`slack_id`=? WHERE idusers=?';
    const {
      name, pronoun, email, username, image, primaryPhone, wiwId, slackId,
    } = req.body;
    if (![name, pronoun, email, username, image, primaryPhone].filter(e => e === null).length) {
      const sql = mysql.format(uSql,
        [name, pronoun, email, username, image, wiwId, primaryPhone, slackId]);
      app.pool.query(sql).then((error, results) => {
        if (error) throw error;
        res.send({ response: results });
      });
    }
    res.send({ response: 'failure' });
  });
  // Delete User
  app.post('api/admin/users/:userId', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'DELETE FROM `users` WHERE `idsuers`=?';
    const { uid } = req.body;
    const sql = mysql.format(uSql, [uid]);
    app.pool.query(sql, (error, results) => {
      if (error) throw error;
      res.send({ response: results });
    });
    res.send({ response: 'success' });
  });
};
