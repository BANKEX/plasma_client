


const connect = require('connect');
const serveStatic = require('serve-static');
const request = require('request');

const config = require('./config.js');

const app = connect()

console.log(config.plasma_host);

app.use('/api', (req, res) => {

    // console.log(req)

    var _path = req.originalUrl.split('/api/')[1]

    request.get(config.plasma_host + _path).pipe(res)

});


app.use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});