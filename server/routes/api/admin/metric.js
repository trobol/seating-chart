const moment = require('moment');

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets data about pronouns
  app.get('/api/admin/metrics/pronouns/', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT `users`.`pronoun` FROM `users`';
    app.pool.query(sql, (error, results) => {
      if (error) throw res.send({ response: error });
      else {
        const sortedResult = results.reduce((acc, { pronoun }) => {
          if (pronoun === 'N/A');
          else if (acc[pronoun]) {
            acc[pronoun] += 1;
          } else {
            acc[pronoun] = 1;
          }
          return acc;
        }, {});
        res.send({ data: Object.values(sortedResult), labels: Object.keys(sortedResult) });
      }
    });
  });
  // Gets data about hours depending on length of time specified
  app.get('/api/admin/metrics/hours/:length', isLoggedIn, isAdmin, (req, res) => {
    const { length } = req.params;
    const sql = 'SELECT `idtime_log`, `u_id`, `login`, `logout` FROM `user_time_log` WHERE 1';
    const now = moment();
    try {
      const begin = moment().startOf(length);
      app.pool.query(sql, (error, result) => {
        if (error) throw res.send({ response: error });
        else if (length !== 'year') {
          const hours = result
            .filter(({ login }) => login >= begin)
            .map(({ login, logout }) => (logout ? { login, logout } : { login, logout: now }))
            .reduce((acc, { login, logout }) => acc + moment(logout).diff(moment(login), 'hours', true), 0);
          res.send({ hours });
        } else {
          const hours = result
            .filter(({ login }) => login >= begin)
            .map(({ login, logout }) => (logout ? { login, logout } : { login, logout: now }))
            .reduce((acc, { login, logout }) => {
              const month = moment(login).format('MMMM');
              const difference = moment(logout).diff(moment(login), 'hours', true);
              return (acc[month]) ? { ...acc, [month]: acc[month] + difference } : { ...acc, [month]: difference };
            }, {});
          res.send({ data: Object.values(hours), labels: Object.keys(hours) });
        }
      });
    } catch (_error) {
      // TODO: FISCAL YEAR
      if (length === ' fiscal') {
        app.pool.query(sql, (error, result) => {
          if (error) throw res.send({ response: error });
          else res.send({ response: result });
        });
      } else {
        res.sendStatus(500);
      }
    }
  });
};
