const mysql = require('mysql');
const moment = require('moment');

const calcHours = (login, logout) => {
  if (logout === null) {
    return moment().diff(moment(login), 'hours', true);
  }
  return moment(logout).diff(moment(login), 'hours', true);
};

module.exports = (app, isLoggedIn) => {
  app.get('/api/users/timesheets', isLoggedIn, (req, res) => {
    const uSql = 'SELECT `u_id` as uid, `login`, `logout` FROM `user_time_log` WHERE u_id=? ORDER BY `idtime_log` DESC';
    const sql = mysql.format(uSql, [req.user.idusers]);
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ response: error });
      else {
        const now = moment();
        const resultByWeek = result.map(e => (e.logout ? e : { ...e, logout: now })).reduce((acc, { uid, login, logout }) => {
          const startOfWeek = moment(login).subtract(login.getDay() - 1, 'days').format('MM/DD/YYYY');
          return (!acc[startOfWeek]) ? {
            ...acc,
            [startOfWeek]: [{
              uid, login, logout, hours: calcHours(login, logout),
            }],
          } : {
            ...acc,
            [startOfWeek]: [...acc[startOfWeek], {
              uid, login, logout, hours: calcHours(login, logout),
            }],
          };
        }, {});
        res.send({ result: resultByWeek, error });
      }
    });
  });
};
