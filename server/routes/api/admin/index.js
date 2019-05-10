/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const mysql = require('mysql');

module.exports = (app, isLoggedIn, passport) => {
  const isAdmin = (req, res, next) => {
    const id = req.user.idusers;
    const uSql = 'SELECT * FROM `users_user_type` as uut WHERE uut.`u_id` = ? AND uut.`ut_id` = 1';
    const sql = mysql.format(uSql, [id]);
    app.pool.query(sql, (err, results) => {
      if (results !== null && results.length === 1) {
        next();
      } else {
        res.redirect('/');
      }
    });
  };
  fs.readdirSync(`${__dirname}/`).forEach((file) => {
    if (file === 'index.js') return;
    const ext = file.indexOf('.');
    if (ext !== -1) {
      require(`./${file.substr(0, ext)}`)(app, isLoggedIn, isAdmin, passport);
    } else {
      require(`./${file}`)(app, passport);
    }
  });
};
