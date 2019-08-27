const mysql = require('mysql');

module.exports = (app) => {
  app.get('/api/users/get-majors', (req, res) => {
    if (req.isAuthenticated()) {
      const sql = mysql.format('SELECT m.`major` FROM `major` as m INNER JOIN `user_major` ON `user_major`.`m_id` = m.idmajor WHERE `user_major`.`u_id` = ?', [req.user.idusers]);
      app.pool.query(sql, (error, results) => {
        if (error) { res.send({ response: error }); }
        const majors = results.map(m => (m.major));
        res.send({ majors });
      });
      // Get majors api call
    } else {
      res.send({});
    }
  });
};
