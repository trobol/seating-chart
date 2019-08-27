const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { isValidPath, Base } = require('../../../util/utility');

const { SALTROUNDS } = process.env;

// untaxed pensions
module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets All Users
  app.get('/api/admin/users/', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT u.*, GROUP_CONCAT(DISTINCT p.project SEPARATOR ",") as projects, GROUP_CONCAT(DISTINCT ut.type SEPARATOR ",") as userTypes,  GROUP_CONCAT(DISTINCT m.major SEPARATOR ",") as majors'
    + ' FROM `users` as u '
    + ' LEFT JOIN `user_projects` as up ON u.`idusers` = up.`u_id`'
    + ' LEFT JOIN `projects` as p ON p.`idprojects` = up.`p_id`'
    + ' LEFT JOIN `user_user_type` as uut ON u.`idusers` = uut.`u_id`'
    + ' LEFT JOIN `user_type` as ut ON uut.`ut_id` = ut.`iduser_type`'
    + ' LEFT JOIN `user_major` as um ON u.`idusers` = um.`u_id`'
    + ' LEFT JOIN `major` as m ON m.`idmajor` = um.`m_id`'
    + ' GROUP BY u.idusers';
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.send({ response: error });
      else {
        const resImagePath = results.map(async (user) => {
          const { majors, userTypes, projects } = user;
          const mput = {
            majors: (!_.isUndefined(majors) && !_.isEmpty(majors) ? majors.split(',') : []),
            userTypes: (!_.isUndefined(userTypes) && !_.isEmpty(userTypes) ? userTypes.split(',') : []),
            projects: (!_.isUndefined(projects) && !_.isEmpty(projects) ? projects.split(',') : []),
          };
          if (await isValidPath(`${Base}/static/users/${user.image}.jpg`)) {
            return { ...user, ...mput, path: `/static/users/${user.image}.jpg` };
          }
          return { ...user, ...mput, path: '/static/users/guest.jpg' };
        });
        Promise.all(resImagePath).then((result) => {
          res.send({ response: { results: result, fields } });
        });
      }
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
      const userTypeSql = 'INSERT INTO `user_user_type`(`u_id`, `ut_id`) VALUES ';
      const projectSql = 'INSERT INTO `user_projects`(`u_id`, `p_id`) VALUES ';
      const majorSql = 'INSERT INTO `user_major`(`u_id`,`m_id`) VALUES ';
      bcrypt.hash(password, Number(SALTROUNDS), (error, hash) => {
        app.pool.getConnection((_error, connection) => {
          connection.beginTransaction((err) => {
            if (err) res.send({ err });
            else {
              connection.query(userSql, [name, pronoun, email, username, image, phone], (userErr, result) => {
                connection.query('SELECT LAST_INSERT_ID() as id', (idErr, idresult) => {
                  if (userErr) connection.rollback(sqlErr => res.status(500).send({ sqlErr, userErr }));
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
                      console.error(generalError);
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
    // https://codeburst.io/asynchronous-file-upload-with-node-and-react-ea2ed47306dd
    const image = req.files.file;
    const { filename, idusers } = req.body;
    const { user } = req;
    console.log({ image });
    if (!idusers && !user.path && idusers === user.idusers) {
      image.mv(`${Base + user.path}`, (err) => {
        if (err) {
          res.status(500).send({ err });
        } else {
          res.send({ response: 'success' });
        }
      });
    } else {
      image.mv(`${Base}/static/users/${filename}.jpg`, (err) => {
        if (err) {
          res.status(500).send({ err });
        } else {
          res.send({ response: 'success' });
        }
      });
    }
  });
  // Gets info for individual user
  app.get('/api/admin/users/:userId', isLoggedIn, isAdmin, (req, res) => {
    const { userId } = req.params;
    const uSql = 'SELECT * FROM `users` WHERE idusers = ?';
    const sql = mysql.format(uSql, userId);
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.status(500).send({ response: error });
      res.send({ response: { results, fields } });
    });
  });
  // Edit/Update User;
  app.post('/api/admin/users/edit/:userId', isLoggedIn, isAdmin, (req, res) => {
    const {
      name, pronoun, username, email,
    } = req.body;
    const { userId } = req.params;
    const body = {
      name, pronoun, email, username,
    };
    const sqlValues = Object.keys(body)
      .filter(key => body[key] !== null && body[key] !== undefined)
      .flatMap(key => mysql.format('??=?', [key, body[key]]))
      .join(',');
    console.log(sqlValues);
    app.pool.query(`UPDATE users SET ${sqlValues} WHERE idusers=?`, [userId], (error, result) => {
      if (error) res.send({ error });
      else res.send({ result });
    });
  });

  // Used to edit major, userType, or Project
  // TODO: make regular expression for parameters
  app.post('/api/admin/users/edit/:userId/:table', isLoggedIn, isAdmin, (req, res) => {
    const { userId, table } = req.params;
    const connectingTable = `user_${table}`;
    const { newIds } = req.body;
    app.pool.query('DELETE FROM ?? WHERE u_id = ?', [connectingTable, userId], (error, result) => {
      if (error) res.send({ error });
      else {
        const newIdsSql = `INSERT INTO ?? VALUES ${newIds.map(e => mysql.format('(?,?)', [userId, Number(e)])).join(',')}`;
        app.pool.query(newIdsSql, [connectingTable], (errors, results) => {
          if (errors) res.send({ errors });
          else {
            res.send({ result, results });
          }
        });
      }
    });
  });
  // Resets users password
  app.post('/api/admin/users/reset/:userId', isLoggedIn, isAdmin, (req, res) => {
    const {
      password, newPassword,
    } = req.body;
    const { userId } = req.params;
    app.pool.query('SELECT `user_hash`.`password_hash`, `users`.`username`, `users`.`idusers` FROM `users` INNER JOIN `user_hash` ON `users`.`idusers` = `user_hash`.`u_id` WHERE `users`.`idusers` = ?;',
      [userId],
      (error, results) => {
        if (error) res.send({ error });
        else if (!results.length) {
          throw new Error('No User Found');
        } else {
          const [user] = results;
          bcrypt.compare(password, user.password_hash, (cmpErr, isMatch) => {
            if (cmpErr) res.send({ error: cmpErr });
            else if (isMatch) {
              bcrypt.hash(newPassword, Number(SALTROUNDS), (hashErr, hash) => {
                if (hashErr) res.send({ error: hashErr });
                app.pool.query('UPDATE user_hash SET password_hash=? WHERE u_id=?', [hash, userId], (errors, result) => {
                  if (errors) res.send({ error: errors });
                  else res.send({ result });
                });
              });
            } else {
              res.send({ error: 'Does Not Match' });
            }
          });
        }
      });
  });

  // Delete User
  app.post('api/admin/users/:userId', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'DELETE FROM `users` WHERE `idsuers`=?';
    const { userId } = req.params;
    const sql = mysql.format(uSql, [userId]);
    app.pool.query(sql, (error, results) => {
      if (error) res.status(500).send({ response: error });
      else res.send({ response: results });
    });
  });
};
