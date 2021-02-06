import express = require('express');
import path = require('path');

// Create a new express application instance
const app: express.Application = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});