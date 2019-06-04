/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

module.exports = (app, isLoggedIn, isAdmin, passport) => {
  console.log({
    app, isLoggedIn, isAdmin, passport,
  });
  fs.readdirSync(`${__dirname}/`).forEach((file) => {
    if (file === 'index.js') return;
    const ext = file.indexOf('.');
    if (ext !== -1) {
      require(`./${file.substr(0, ext)}`)(app, isLoggedIn, isAdmin, passport);
    } else {
      require(`./${file}`)(app, isLoggedIn, isAdmin, passport);
    }
  });
};
