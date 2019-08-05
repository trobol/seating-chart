const cron = require('node-cron');
const moment = require('moment');
const mysqldump = require('mysqldump');

const {
  MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DATABASE,
} = process.env;

module.exports = (app) => {
  // logouts all user at midnight
  cron.schedule('05 08 * * *', () => {
    // eslint-disable-next-line no-console
    console.log('Midnight Mass Logout');
    app.pool.query('UPDATE `user_time_log` SET `logout`=NOW() WHERE `logout` IS NULL');
  });
  // forces all users out of their seats at midnight;
  cron.schedule('05 08 * * *', () => {
    // eslint-disable-next-line no-console
    console.log('Midnight Mass Seat Removal');
    app.pool.query('UPDATE `seats` SET `u_id`=NULL WHERE `u_id` IS NOT NULL');
  });
  // Backs up database every first of the month
  cron.schedule('* * 1 1-12 *', () => {
    // TODO: if .database folder doesn't exist create it then dump
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
  // TODO: emails students their times at the end of the week
};
