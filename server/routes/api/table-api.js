module.exports = (app) => {
  app.post('/api/table-api/', (req, res) => {
    const testSql = 'select `idusers` as `user id`, `name`, `computer_name` as `seat name` from `users` left join `seats` on `users`.`idusers` = `seats`.`u_id`';
    app.pool.query(testSql, (error, results, fields) => {
      if (error) throw error;
      res.send({ response: results });
    });
  });
};
