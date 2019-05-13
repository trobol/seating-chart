module.exports = (app, isLoggedIn, isAdmin) => {
  app.get('/api/logs/', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT * FROM `logs`';
    app.pool.query(sql, (error, results) => {
      if (error) throw error;
      res.send({ response: results });
    });
    res.send({ response: 'failure' });
  });
};
