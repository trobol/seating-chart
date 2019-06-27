const mysql = require('mysql');
const moment = require('moment');

module.exports = (app, isLoggedIn) => {
  app.get('/api/users/timesheets', isLoggedIn, (req, res) => {
    const uSql = 'SELECT `u_id` as uid, `login`, `logout` FROM `user_time_log` WHERE u_id=?';
    const sql = mysql.format(uSql, [req.user.idusers]);
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ response: error });
      else {
        const initValue = {};
        const resultByWeek = result.reduce((acc, { uid, login, logout }) => {
          const startOfWeek = moment(login).subtract(login.getDay() - 1, 'days').format('MM/DD/YYYY');
          acc[startOfWeek] = (typeof acc[startOfWeek] === 'undefined') ? [{ uid, login, logout }] : [...acc[startOfWeek], { uid, login, logout }];
          return acc;
        }, initValue);
        console.log({ resultByWeek, error });
        res.send({ result: resultByWeek, error });
      }
    });
  });
};
