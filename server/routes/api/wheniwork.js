const mysql = require("mysql");
let WIW = require('wheniwork').WIW;
const WIW_API_KEY = process.env.WIW_API_KEY
const WIW_USERNAME = process.env.WIW_USERNAME
const WIW_PASSWORD = process.env.WIW_PASSWORD
const WIW_ACCOUNT_ID = process.env.WIW_ACCOUNT_ID
module.exports = (app)=>{
    app.post("/api/wheniwork", (req, res)=>{
        let endpoint = req.body.endpoint;
        let wiw = new WIW(WIW_API_KEY, WIW_USERNAME, WIW_PASSWORD);
        let parameters = new JSON();
        wiw.config.accountId = WIW_ACCOUNT_ID;
        switch (endpoint){
        case 'times/clockin':
        case 'times/clockout':
            parameters = {"id": req.body.id};
            break;
        }
        wiw.post(endpoint, parameters).then((result)=>{
            console.log(res)
        })
        console.log({WIW_API_KEY, WIW_USERNAME, WIW_PASSWORD})
    })
}
