const { isValidPath, Base } = require('../../../util/utility');

module.exports = (app, isLoggedIn, isAdmin) => {
  app.get('/api/admin/logs/', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT * FROM `log` ORDER BY idlog DESC LIMIT 10';
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ error });
      else {
        const logs = result.map(async (log) => {
          if (await isValidPath(`${Base}/static/users/${log.image}.jpg`)) {
            return { ...log, image: `/static/users/${log.image}.jpg` };
          }
          return { ...log, image: '/static/users/guest.jpg' };
        });
        Promise.all(logs).then((results) => {
          res.send({ result: results });
        });
      }
    });
  });
};
