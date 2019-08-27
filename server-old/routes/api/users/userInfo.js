const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const { SALTROUNDS } = process.env;

const base = path.resolve('.');
module.exports = (app) => {
  app.get('/api/users/get-user', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      // fs.stat takes in a absolute path not relative
      // therefore we need to give it the base
      fs.stat(`${base}/static/users/${user.image}.jpg`, (err) => {
        if (err) {
          user.path = '/static/users/guest.jpg';
          res.send({ user, authenticated: true });
        } else {
          user.path = `/static/users/${user.image}.jpg`;
          res.send({ user, authenticated: true });
        }
      });
    } else {
      res.json({ authenticated: false });
    }
  });
  app.post('/api/users/edit/', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      const {
        passwordReset, password, newPassword, major, userType, project,
      } = req.body;
      res.send({ user, authenticated: true });
    } else {
      res.send({ authenticated: false });
    }
  });
  app.post('/api/users/reset', (req, res) => {
    const {
      password, newPassword,
    } = req.body;
    const { idusers } = req.user;
    if (req.isAuthenticated()) {
      app.pool.query('SELECT `user_hash`.`password_hash`, `users`.`username`, `users`.`idusers` FROM `users` INNER JOIN `user_hash` ON `users`.`idusers` = `user_hash`.`u_id` WHERE `users`.`idusers` = ?;',
        [idusers],
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
                  app.pool.query('UPDATE user_hash SET password_hash=? WHERE u_id=?', [hash, idusers], (errors, result) => {
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
    } else {
      res.send({ authenticated: false });
    }
  });
  // Used to edit major, userType, or Project
  // TODO: make regular expression for parameters
  app.post('/api/users/edit/:table', (req, res) => {
    const { table } = req.params;
    const connectingTable = `user_${table}`;
    const { newIds } = req.body;
    const { idusers } = req.user;
    if (req.isAuthenticated()) {
      app.pool.query('DELETE FROM ?? WHERE u_id = ?', [connectingTable, idusers], (error, result) => {
        if (error) res.send({ error });
        else {
          const newIdsSql = `INSERT INTO ?? VALUES ${newIds.map(e => mysql.format('(?,?)', [idusers, Number(e)])).join(',')}`;
          app.pool.query(newIdsSql, [connectingTable], (errors, results) => {
            if (errors) res.send({ errors });
            else {
              res.send({ result, results });
            }
          });
        }
      });
    } else {
      res.send({ authenticated: false });
    }
  });
};
