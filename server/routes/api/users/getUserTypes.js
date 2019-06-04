
const mysql = require('mysql');

module.exports = (app) => {
  app.get('/api/users/get-user-types', (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      const sql = mysql.format('SELECT ut.`type` FROM `user_type` as ut INNER JOIN `users_user_type` as uut ON uut.`ut_id` = ut.iduser_type WHERE uut.`u_id` = ?;', [user.idusers]);
      app.pool.query(sql, (error, results) => {
        if (error) { res.send({ response: error }); }
        const types = results.map(ut => (ut.type));
        res.send({ types });
      });
    } else {
      res.send(({ authenticated: false }));
    }
  });
};
