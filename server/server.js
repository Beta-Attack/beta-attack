const express = require('express');
const path = require('path');
const attack = require('../attack');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/attack', (req, res) => {
  let url = null;
  if (typeof req.body.url === 'string') url = req.body.url;
  else res.end('Invalid Input');
  attack
    .injectFormInput(url)
    .then((response) => {
      console.log('response in server: ', response);
      res.send(response);
    });
});

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/dist/style/img', express.static(path.join(__dirname, '../dist/img')));
app.use('/img', express.static(path.join(__dirname, '../dist/img')));

const PORT = 4321;

app.listen(PORT, () => {
  console.log('You are listening on: ', PORT);
});
