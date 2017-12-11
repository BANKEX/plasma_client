


const connect = require('connect');
const serveStatic = require('serve-static');
const request = require('request');

const config = require('./config.js');

const app = connect()

app.use('/api', (req, res) => {

    var _path = req.originalUrl.split('/api/')[1]

    request.get({uri: config.plasma_host + _path, timeout: 2000}).on('error', e=>{
        res.writeHead(408)
        res.end()
    }).pipe(res)

});


app.use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});