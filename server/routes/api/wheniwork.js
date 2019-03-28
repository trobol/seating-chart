const mysql = require("mysql");
let WIW = require('wheniwork').WIW;
const WIW_API_KEY = process.env.WIW_API_KEY
const WIW_USERNAME = process.env.WIW_USERNAME
const WIW_PASSWORD = process.env.WIW_PASSWORD
module.exports = (app)=>{
    app.get("api/wheniwork.js", (req, res)=>{
        res.send({ response: 'successs' });
        console.log({WIW_API_KEY, WIW_USERNAME, WIW_PASSWORD})
    })
}
