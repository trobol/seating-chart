/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

module.exports = (app, passport) => {
  fs.readdirSync(`${__dirname}/`).forEach((file) => {
    if (file === 'index.js') return;
    const ext = file.indexOf('.');
    if (ext !== -1) {
      require(`./${file.substr(0, ext)}`)(app, passport);
    } else {
      require(`./${file}`)(app, passport);
    }
  });
};
