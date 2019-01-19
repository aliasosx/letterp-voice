const express = require('express');

const http = require('http');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser({ extended: true }));
app.use(express.static(__dirname + '/public'));
http.createServer(app).listen(8001, () => {
    console.log('Server started on port ' + 8001);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/info', (req, res) => {
    var osvar = process.platform;
    res.send(osvar);
});