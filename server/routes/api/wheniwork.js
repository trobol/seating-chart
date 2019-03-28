module.exports = (app) => {
  app.post('/api/wheniwork', (req, res) => {
    res.send({ response: 'success' });

    console.log(process.env.TEST_API);
  });
};

