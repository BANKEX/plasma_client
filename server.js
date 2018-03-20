const connect = require('connect');
const serveStatic = require('serve-static');
const request = require('request');

const config = require('./config.js');
const bodyParser = require('body-parser');
const app = connect();
// var textBody = require("body");
// var jsonBody = require("body/json");
// var formBody = require("body/form");
// const rp = require('request-promise-native');

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api', (req, res) => {

    const _path = req.originalUrl.substr(4);
    const requestType = req.method;

    // console.log(requestType + ": " + config.plasma_host + _path);

    if (requestType === "GET") {
        request.get({uri: config.plasma_host + _path, timeout: 2000}).on('error', e=>{
            res.writeHead(408);
            res.end()
        }).pipe(res)
    } else if (requestType === "POST") {
        request.post({uri: config.plasma_host + _path, headers: {"Content-Type":"application/json"}, body: req.body, json: true, timeout: 2000}).on('error', e=>{
            res.writeHead(408);
            res.end()
        }).pipe(res)
    }
});


app.use(serveStatic(__dirname)).listen(9000, function(){
    console.log('Server running on 9000...');
});