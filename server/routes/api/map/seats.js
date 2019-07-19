module.exports = (app) => {
  app.get('/api/map/seats/', (req, res) => {
    const sql = 'SELECT s.`idseats` as sid, s.`computer_name` as computerName, s.`u_id` as uid, u.`name`, u.`image` FROM `seats` as s INNER JOIN `users` as u on s.`u_id` = u.`idusers` WHERE s.`u_id`IS NOT NULL';
    app.pool.query(sql, (err, results) => {
      console.log({ err, results });
      // eslint-disable-next-line prefer-const
      let seats = results;
      if (seats !== null || seats !== undefined) {
        for (let i = 0; i < seats.length; i += 1) {
          seats[i].image = `static/users/${seats[i].image}.jpg`;
        }
      }
      res.send({ response: { err, seats } });
    });
  });
};
