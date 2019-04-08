module.exports = (app) => {
  app.post('/api/table-api/', (req, res) => {
    const testSql = 'select `users`.`idusers`, `users`.`name`, `seats`.`idseats` from `users` left join `seats` on `seats`.`u_id` = `users`.`idusers`';
    // const update = 'UPDATE `seats` SET `u_id`=? WHERE `idseats`=?';
    app.pool.query(testSql, (error, results, fields) => {
      if (error) throw error;
      res.send({ response: req.body.name });
    });
  });
};
