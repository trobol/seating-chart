const mysql = require('mysql');

module.exports = (app) => {
  app.post('/api/test-api', (req, res) => {
    const { name } = req.body;
    const sql = mysql.format('SELECT `users`.`name` from `users` where `users`.`name` = ?', [name]);
    app.pool.query(sql, (error, results) => {
      console.log(error);
      if (error) throw error;

      res.send(results[0]);
    });
  });
};
