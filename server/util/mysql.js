const cron = require('node-cron');
const moment = require('moment');
const mysql = require('mysql');
const mysqldump = require('mysqldump');

const {
  MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DATABASE,
} = process.env;

module.exports = (app) => {
  // logouts all user at midnight
  cron.schedule('59 23 * * *', () => {
    const now = moment();
    const sql = mysql.format('UPDATE `user_time_log` SET `logout`=? WHERE `logout` IS NULL', [now]);
    console.log('Midnight Mass Logout');
    app.pool.query(sql);
  });
  // forces all users out of their seats at midnight;
  cron.schedule('59 23 * * *', () => {
    console.log('Midnight Mass Seat Removal');
    app.pool.query('UPDATE `seats` SET `u_id`=NULL WHERE `u_id` IS NOT NULL');
  });
  // Backs up database every first of the month
  cron.schedule('* * 1 1-12 *', () => {
    mysqldump({
      connection: {
        host: MYSQL_HOST,
        user: 'root',
        password: '',
        database: MYSQL_DATABASE,
      },
      dumpToFile: `./.database/${moment().format('x')}.sql`,
    });
  });
};
