const mysql = require('mysql');

module.exports = (app, isLoggedIn) => {
  app.post('/api/seat/reserve/', isLoggedIn, (req, res) => {
    res.send({ response: 'success' });
  });
  app.get('/api/seat/reserve', (req, res) => {
    res.send({ response: 'success' });
  });
};
