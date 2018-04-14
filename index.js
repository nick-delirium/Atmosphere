const express  = require('express'),
      axios    = require('axios'),
      compress = require('compression'),
      fs       = require('fs'),
      path     = require('path'),
      app      = express();

let data    = fs.readFileSync('data.json', 'utf8');
let markers = fs.readFileSync('markers.json', 'utf8');


app.use(compress());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8082");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api', (req, res) => {
    let json = {
        status: 200,
        message: 'Hello',
        data: data
    };
    res.send(json);
});
app.get('/api/markers', (req, res) => {
    let json = {
        status: 200,
        data: markers
    };
    res.send(json);
})


app.listen(8085, () => console.log('server is live @8085'))