const mysql = require('mysql');
const { WIW } = require('wheniwork');

const { WIW_API_KEY } = process.env;
const { WIW_USERNAME } = process.env;
const { WIW_PASSWORD } = process.env;
const { WIW_ACCOUNT_ID } = process.env;
module.exports = (app) => {
  app.post('/api/wheniwork', (req, res) => {
    const { endpoint } = req.body;
    const wiw = new WIW(WIW_API_KEY, WIW_USERNAME, WIW_PASSWORD);
    let parameters;
    wiw.config.accountId = WIW_ACCOUNT_ID;
    switch (endpoint) {
      case 'times/clockin':
      case 'times/clockout':
        parameters = { id: req.body.id };
        break;
      case 'times/user/':
        const start = new Date(0);
        const end = new Date();
        parameters = {
          id: req.body.id,
        };
        break;
    }
    switch (req.body.requestType) {
      case 'post':
        wiw.post(endpoint, parameters).then((res) => {
          console.log(res);
        });
        break;
      case 'get':
        wiw.get(endpoint, parameters).then((res) => {
          console.log(res);
        });
        break;
    }
    console.log({
      WIW_API_KEY, WIW_USERNAME, WIW_PASSWORD, endpoint, parameters,
    });
  });
};
