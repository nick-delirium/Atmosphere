const express  = require('express'),
      axios    = require('axios'),
      compress = require('compression'),
      fs       = require('fs'),
      path     = require('path'),
      textract = require('textract'),
      app      = express();

let data    = JSON.parse(fs.readFileSync('data.json', 'utf8'));
let markers = JSON.parse(fs.readFileSync('markers.json', 'utf8'));

let districs = JSON.parse(fs.readFileSync('toxic.json', 'utf8'));
let reg, parts = [];

textract.fromFileWithPath('./2018-04-13.txt', function( error, text ) {
    // console.log(error);
    for(let i = 0; i < districs.length; i++) {
        reg = districs[i].title+'.*?(\\d,\\d).*?(\\d,\\d).*?(\\d,\\d).*?(\\d,\\d)';
        let regexp = new RegExp(reg, 'i');
        let arr = text.match(regexp);
        let loc = {
            "lt":districs[i].lt,
            "ln":districs[i].ln
        }
        parts.push({"title": districs[i].title, "location": loc, "co": arr[1], "no": arr[2], "no2": arr[3], "so2": arr[4]});
    }
})

app.use(compress());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
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
        "status": 200,
        "data": markers
    };
    res.send(json);
});

app.get('/api/toxic', (req, res) => {
    let json = parts;
    res.send(json);
})


app.listen(8085, () => console.log('server is live @8085'))