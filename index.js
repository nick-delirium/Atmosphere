const express  = require('express'),
      axios    = require('axios'),
      compress = require('compression'),
      fs       = require('fs'),
      path     = require('path'),
      app      = express();

let data = fs.readFileSync('data.json', 'utf8');

app.use(compress());

app.get('/api', (req, res) => {
    let json = {
        status: 200,
        message: 'Hello',
        data: data
    }
    res.send(json);
})

app.listen(8085, () => console.log('server is live @8085'))