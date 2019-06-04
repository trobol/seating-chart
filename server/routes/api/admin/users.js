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
      name, pronoun, email, username, phone, password, userType, projects, major,
    } = req.body;
    if (![name, pronoun, email, username, phone, password]
      .filter(e => e === null && e === undefined).length) {
      const image = name.replace(' ', '');
      const userSql = 'INSERT INTO `users`(`name`, `pronoun`, `email`, `username`, `image`, `primary_phone`, `account_created`) VALUES (?,?,?,?,?,?,NOW())';
      const hashSql = 'INSERT INTO `user_hash`(`u_id`, `password_hash`) VALUES (?,?)';
      const userTypeSql = 'INSERT INTO `users_user_type`(`u_id`, `ut_id`) VALUES ';
      const projectSql = 'INSERT INTO `user_project`(`u_id`, `p_id`) VALUES ';
      const majorSql = 'INSERT INTO `user_major`(`u_id`,`m_id`) VALUES ';
      bcyrpt.hash(password, Number(SALTROUNDS), (error, hash) => {
        app.pool.getConnection((_error, connection) => {
          connection.beginTransaction((err) => {
            if (err) res.send({ err });
            else {
              connection.query(userSql, [name, pronoun, email, username, image, phone], (userErr, result) => {
                connection.query('SELECT LAST_INSERT_ID() as id', (idErr, idresult) => {
                  if (userErr) connection.rollback(sqlErr => res.send({ sqlErr, userErr }));
                  else {
                    try {
                      const { id } = idresult[0];
                      const userTypeValues = userType.map(e => mysql.format('(?,?)', [id, Number(e)])).join(',');
                      const projectValues = projects.map(e => mysql.format('(?,?)', [id, Number(e)])).join(',');
                      const majorValues = major.map(e => mysql.format('(?,?)', [id, Number(e)])).join(',');
                      const promises = [
                        connection.query(hashSql, [id, hash]),
                        userType.length ? connection.query(userTypeSql + userTypeValues) : null,
                        projects.length ? connection.query(projectSql + projectValues) : null,
                        major.length ? connection.query(majorSql + majorValues) : null,
                      ].filter(e => e !== null);
                      Promise.all(promises)
                        .then(() => {
                          connection.commit(() => {
                            res.send({ response: 'success' });
                            connection.release();
                          });
                        })
                        .catch(promiseErr => connection.rollback((sqlErr) => {
                          res.status(500).send({ sqlErr, promiseErr });
                          connection.release();
                        }));
                    } catch (generalError) {
                      console.log(generalError);
                    }
                  }
                });
              });
            }
          });
        });
      });
    } else {
      res.send({ response: 'failure' });
    }
  });
  app.post('/api/admin/users/image/', isLoggedIn, isAdmin, (req, res) => {
    const image = req.files.file;
    const { PWD } = process.env;
    // https://codeburst.io/asynchronous-file-upload-with-node-and-react-ea2ed47306dd
    image.mv(`${PWD}/static/users/${req.body.filename}.jpg`, (err) => {
      if (err) {
        res.status(500).send({ err });
      } else {
        res.send({ response: 'success' });
      }
    });
  });
  // Gets info for individual user
  app.get('api/admin/users/:userId', isLoggedIn, isAdmin, (req, res) => {
    const { uid } = req.body;
    const uSql = 'SELECT * FROM `users` WHERE idusers = ?';
    const sql = mysql.format(uSql, uid);
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.status(500).send({ response: error });
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
      res.status(500).send({ response: 'failure' });
    }
  });
  // Delete User
  app.post('api/admin/users/:userId', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'DELETE FROM `users` WHERE `idsuers`=?';
    const { uid } = req.body;
    const sql = mysql.format(uSql, [uid]);
    app.pool.query(sql, (error, results) => {
      if (error) res.status(500).send({ response: error });
      else res.send({ response: results });
    });
  });
};
