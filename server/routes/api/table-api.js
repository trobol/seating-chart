module.exports = (app) => {
  app.post('/api/table-api/', (req, res) => {
    const testSql = 'select * from `users`';
    app.pool.query(testSql, (error, results, fields) => {
      if (error) throw error;
      res.send({ response: results });
    });
  });
};
