/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
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
  /*
    Don't use this async because it will not load some routes
    before loading the global route in server.js
  fs.readdir(`${__dirname}/`, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      if (file === 'index.js') return;
      const ext = file.indexOf('.');
      if (ext !== -1) {
        require(`./${file.substr(0, ext)}`)(app, passport);
      } else {
        require(`./${file}`)(app, passport);
      }
    });
  });
  */
};
