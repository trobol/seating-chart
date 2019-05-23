
module.exports = (app) => {
  app.get('/api/users/majors', (req, res) => {
    app.pool.query('SELECT * FROM `major`', (error, results) => {
      res.send({ majors: results });
    });
  });
};
