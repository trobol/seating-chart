/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

module.exports = (app, passport) => {
  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  };

  fs.readdir(`${__dirname}`, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      if (file === 'index.js') return;
      const ext = file.indexOf('.');

      if (ext !== -1) {
        require(`./${file.substr(0, ext)}`)(app, isLoggedIn, passport);
      } else {
        require(`./${file}`)(app, passport);
      }
    });
  });
};
