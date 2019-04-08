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
        const startTime = new Date(0);
        const endTime = new Date();
        parameters = {
          id: req.body.id,
          start: startTime,
          end: endTime,
        };
        break;
      default:
        console.log(res);
    }
    switch (req.body.requestType) {
      case 'post':
        wiw.post(endpoint, parameters).then((result) => {
          console.log(result);
        });
        break;
      case 'get':
        wiw.get(endpoint, parameters).then((result) => {
          console.log(result);
        });
        break;
      default:
        console.log('defaulted');
    }
    console.log({
      WIW_API_KEY, WIW_USERNAME, WIW_PASSWORD, endpoint, parameters,
    });
  });
};
