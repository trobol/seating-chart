const mysql = require('mysql');

module.exports = (app) => {
  app.post('/api/test-api', (req, res) => {
    res.send({ response: 'successs' });

    let sql = 'SELECT * FROM USERS WHERE ?? = ?';
    const inserts = ['name', req.body.name];
    sql = mysql.format(sql, inserts);

    app.pool.query(sql, (error, results, fields) => {
      if (error) throw error;

      console.log(results);
    });
  });
};
