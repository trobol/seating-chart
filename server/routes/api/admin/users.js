const mysql = require('mysql');
const bcyrpt = require('bcrypt');

const { SALTROUNDS } = process.env;

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets All Users
  app.get('/api/admin/users/', isLoggedIn, isAdmin, (req, res) => {
    const { uid } = req.body;
    const uSql = 'SELECT * FROM `users`';
    const sql = mysql.format(uSql, [uid]);
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.send({ response: error });
      res.send({ response: { results, fields } });
    });
  });
  // Posts new user
  app.post('/api/admin/users/', isLoggedIn, isAdmin, (req, res) => {
    const {
      name, pronoun, email, username, image, primaryPhone, password, userType, projects,
    } = req.query;
    if (![name, pronoun, email, username, image, primaryPhone, password]
      .filter(e => e === null && e === undefined).length) {
      const userSql = 'INSERT INTO `users`(`name`, `pronoun`, `email`, `username`, `image`, `primary_phone`, `account_created`) VALUES (?,?,?,?,?,?,?,NOW())';
      const hashSql = 'INSERT INTO `user_hash`(`u_id`, `password_hash`) VALUES (?,?)';
      const userTypeSql = 'INSERT INTO `users_user_type`(`u_id`, `ut_id`) VALUES ';
      const projectSql = 'INSERT INTO `user_project`(`u_id`, `p_id`) VALUES ';
      bcyrpt.hash(password, SALTROUNDS, (error, hash) => {
        app.pool.getConnection((_error, connection) => {
          connection.beginTransaction((err) => {
            if (err) { throw err; }
            connection.query(userSql, [name, pronoun, email, username, image, primaryPhone], (userErr, result) => {
              const { resultId } = result;
              const userTypeValues = userType.map(e => mysql.format('(?,?)', [resultId, e])).join(',');
              const projectValues = projects.map(e => mysql.format('(?,?)', [resultId, e])).join(',');
              const promises = [
                connection.query(hashSql, [resultId, hash]),
                userType.length ? connection.query(userTypeSql + userTypeValues) : null,
                projects.length ? connection.query(projectSql + projectValues) : null,
              ].filter(e => e !== null);
              Promise.all(promises).then((r) => {
                console.log({ r });
              });
            });
          });
        });
      });

      const sql = mysql.format(userSql, [name, pronoun, email, username, image, primaryPhone]);
      app.pool.query(sql).then((error, results) => {
        if (error) throw error;
        res.send({ response: results });
      });
    } else {
      res.send({ response: 'failure' });
    }
  });
  // Gets info for individual user
  app.get('api/admin/users/:userId', isLoggedIn, isAdmin, (req, res) => {
    const { uid } = req.body;
    const uSql = 'SELECT * FROM `users` WHERE idusers = ?';
    const sql = mysql.format(uSql, uid);
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.send({ response: error });
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
    } else {
      res.send({ response: 'failure' });
    }
  });
  // Delete User
  app.post('api/admin/users/:userId', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'DELETE FROM `users` WHERE `idsuers`=?';
    const { uid } = req.body;
    const sql = mysql.format(uSql, [uid]);
    app.pool.query(sql, (error, results) => {
      if (error) res.send({ response: error });
      res.send({ response: results });
    });
  });
};
