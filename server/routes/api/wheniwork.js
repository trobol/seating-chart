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
        let parameters;
        wiw.config.accountId = WIW_ACCOUNT_ID;
        switch (endpoint){
        case 'times/clockin':
        case 'times/clockout':
            parameters = {"id": req.body.id};
            break;
        case 'times/user/':
            let start = new Date(0);
            let end = new Date();
            parameters = {
                "id": req.body.id
            }
            break;
        }
        switch (req.body.requestType) {
        case "post":
            wiw.post(endpoint, parameters).then((res)=>{
                console.log(res)
            })
        break;
        case "get":
            wiw.get(endpoint, parameters).then((res)=>{
                console.log(res)
            })
        break;
        }
        console.log({WIW_API_KEY, WIW_USERNAME, WIW_PASSWORD, endpoint, parameters})
    })
}
