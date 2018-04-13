const express  = require('express'),
      axios    = require('axios'),
      compress = require('compression'),
      app      = express();


app.use(compress());

app.get('/api', (req, res) => {
    let json = {
        status: 200,
        message: 'Hello',
    }
    res.send(json);
})

app.listen(8085, () => console.log('server is live @8085'))