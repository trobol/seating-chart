/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

module.exports = (app, isLoggedIn, passport) => {
  fs.readdirSync(`${__dirname}/`).forEach((file) => {
    if (file === 'index.js' || file === 'README.md') return;
    const ext = file.indexOf('.');
    if (ext !== -1) {
      require(`./${file.substr(0, ext)}`)(app, isLoggedIn, passport);
    } else {
      require(`./${file}`)(app, isLoggedIn, passport);
    }
  });
};
