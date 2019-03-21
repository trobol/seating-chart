/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

module.exports = (app) => {
  fs.readdir(`${__dirname}/api/`, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
    });
  });
};
