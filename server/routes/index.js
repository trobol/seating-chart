/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

module.exports = (app, passport) => {
  fs.readdir(`${__dirname}/api/`, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const ext = file.indexOf('.');
      if (ext !== -1) {
        require(`./api/${file.substr(0, ext)}`)(app, passport);
      } else {
        require(`./api/${file}`)(app, passport);
      }
    });
  });
};
