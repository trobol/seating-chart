/* eslint-disable no-nested-ternary */
const moment = require('moment');
const mysql = require('mysql');

module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets timesheets info for a user
  app.get('/api/admin/timesheets(/user)?/', isLoggedIn, isAdmin, (req, res) => {
    console.log(req.params[0]);
    const sql = 'SELECT `u_id` as uid, `name`, `login`, `logout` FROM `user_time_log` INNER JOIN `users` ON `users`.`idusers`=`user_time_log`.`u_id`';
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ response: error });
      else if (req.params[0]) {
        const newResult = result.reduce((acc, {
          uid, name, login, logout,
        }) => {
          const startOfWeek = moment(login).subtract(login.getDay() - 1, 'days').format('MMM Do YYYY');
          const now = moment();
          const hours = moment(logout || now).diff(moment(login), 'hours', true);
          return (acc[uid])
            ? (acc[uid][startOfWeek]) ? {
              ...acc,
              [uid]: {
                ...acc[uid],
                times: {
                  ...acc[uid].times,
                  [startOfWeek]: acc[uid].times[startOfWeek] + hours,
                },
              },
            } : {
              ...acc,
              [uid]: {
                ...acc[uid],
                times: {
                  ...acc[uid].times,
                  [startOfWeek]: hours,
                },
              },
            }
            : {
              ...acc,
              [uid]: {
                uid,
                name,
                times: {
                  [startOfWeek]: hours,
                },
              },
            };
        }, {});
        res.send({ result: newResult, error });
      } else {
        const resultByWeek = result.reduce((acc, {
          uid, name, login, logout,
        }) => {
          const startOfWeek = moment(login).subtract(login.getDay() - 1, 'days').format('MMM Do YYYY');
          const now = moment();
          const hours = moment(logout || now).diff(moment(login), 'hours', true);
          return (!acc[startOfWeek]) ? {
            ...acc,
            [startOfWeek]: [{
              uid, name, login, logout, hours,
            }],
          } : {
            ...acc,
            [startOfWeek]: [...acc[startOfWeek], {
              uid, name, login, logout, hours,
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
          const now = moment();
          const hours = moment(logout || now).diff(moment(login), 'hours', true);
          return (!acc[startOfWeek]) ? {
            ...acc,
            [startOfWeek]: [{
              uid, login, logout, hours,
            }],
          } : {
            ...acc,
            [startOfWeek]: [...acc[startOfWeek], {
              uid, login, logout, hours,
            }],
          };
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
