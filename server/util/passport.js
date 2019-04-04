const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcrypt');

module.exports = (passport, server) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const sql = mysql.format('SELECT * FROM USERS WHERE ID = ?', [id]);
    server.pool.query(sql, (error, results) => {
      done(error, results[0]);
    });
  });

  passport.use(
    'local-login',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      const sql = mysql.format(
        'SELECT `user_hash`.`password_hash` FROM `users` INNER JOIN `user_hash` ON `users`.`idusers` = `user_hash`.`u_id` WHERE `users`.`username` = ?;', [username],
      );
      server.pool.query(sql, (error, results) => {
        if (error) return done(error);
        if (!results.length) {
          return done(null, false);
        }

        bcrypt.compare(password, results[0].password_hash).then((res) => {
          if (res === true) {
            return done(null, results[0]);
          }

          return done(null, false);
        }).catch(err => done(err));
      });
    }),
  );
};