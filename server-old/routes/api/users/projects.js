
module.exports = (app) => {
  app.get('/api/users/projects', (req, res) => {
    app.pool.query('SELECT * FROM `projects`', (error, results) => {
      res.send({ projects: results });
    });
  });
};
