module.exports = (app, isLoggedIn, isAdmin) => {
  app.get('/api/admin/logs/', isLoggedIn, isAdmin, (req, res) => {
    const sql = 'SELECT * FROM `log` ORDER BY idlog DESC LIMIT 10';
    app.pool.query(sql, (error, result) => {
      if (error) res.send({ error });
      else { res.send({ result }); }
    });
  });
};
