
module.exports = (app) => {
  // Gets guests info
  app.get('/api/admin/guests/', (req, res) => {
    res.send({ response: 'success' });
  });
};
