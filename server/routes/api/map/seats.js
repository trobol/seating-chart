module.exports = (app) => {
  app.get('/api/map/seats/', (req, res) => {
    const sql = 'SELECT s.`idseats`, s.`u_id`, u.`name`, u.`path` FROM `seats` as s INNER JOIN `users` as u on s.`u_id` = u.`idusers` WHERE s.`u_id`IS NOT NULL';
    app.pool.query(sql, (err, results) => {
      res.send({ response: { err, results } });
    });
  });
};
