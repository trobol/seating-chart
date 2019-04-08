const mysql = require('mysql');

module.exports = (app) => {
  app.post('/api/tableApi/', (req, res) => {
    const testSql = 'select idusers, name, idseats from users left join seats on u_id = idusers';
    // const update = 'UPDATE `seats` SET `u_id`=? WHERE `idseats`=?';

    app.pool.query(testSql, (error, results, fields) => {
      if (error) throw error;
      console.log(results);
    });
  });
};
