const mysql = require('mysql');

module.exports = (app) => {
  app.post('/api/seat/reserve/', (req, res) => {
    res.send({ response: 'success' });
  });
  app.get('/api/seat/reserve/', (req, res) => {
    res.send({ response: 'success' });
  });
};
