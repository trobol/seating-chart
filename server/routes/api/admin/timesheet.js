const moment = require('moment');
const mysql = require('mysql');

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets timesheets info for a user
  app.get('/api/admin/timesheets/', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT `u_id` as uid, `name`, `login`, `logout` FROM `user_time_log` INNER JOIN `users` ON `users`.`idusers`=`user_time_log`.`u_id`';
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ response: error });
      else {
        const resultByWeek = result.reduce((acc, {
          uid, name, login, logout,
        }) => {
          const startOfWeek = moment(login).subtract(login.getDay() - 1, 'days').format('MM/DD/YYYY');
          return (!acc[startOfWeek]) ? {
            ...acc,
            [startOfWeek]: [{
              uid, name, login, logout,
            }],
          } : {
            ...acc,
            [startOfWeek]: [...acc[startOfWeek], {
              uid, name, login, logout,
            }],
          };
        }, {});
        res.send({ result: resultByWeek, error });
      }
    });
  });
  // Gets Timesheets for individual user by week
  app.get('/api/admin/timesheets/user/:userId', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'SELECT `u_id` as uid, `login`, `logout` FROM `user_time_log` WHERE u_id=?';
    const sql = mysql.format(uSql, [req.params.userId]);
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ response: error });
      else {
        const resultByWeek = result.reduce((acc, { uid, login, logout }) => {
          const startOfWeek = moment(login).subtract(login.getDay() - 1, 'days').format('MM/DD/YYYY');
          return (!acc[startOfWeek]) ? { ...acc, [startOfWeek]: [{ uid, login, logout }] } : { ...acc, [startOfWeek]: [...acc[startOfWeek], { uid, login, logout }] };
        }, {});
        res.send({ result: resultByWeek, error });
      }
    });
  });
  // #TODO: Edits Timesheet of user
  app.post('/api/admin/timesheets/edit/:userId', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
};
