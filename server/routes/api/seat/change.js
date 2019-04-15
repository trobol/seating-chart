const fetch = require('node-fetch');

module.exports = (app, isLoggedIn) => {
  app.post('/api/seat/change/', isLoggedIn, (req, res) => {
    const { returnSeat, takeSeat, id } = req;
    fetch('/api/return/', { method: 'POST', body: { seat: returnSeat, id } }).then((response) => {
      if (response === 'success') {
        fetch('/api/take/', { method: 'POST', body: { seat: takeSeat, id } }).then(() => {
          res.send({ reponse: 'success' });
        }).catch((error) => {
          console.error(error);
          res.send({ response: error });
        });
      }
    }).catch((error) => {
      console.error(error);
      res.send({ response: error });
    });
  });
};
