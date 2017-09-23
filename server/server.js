const express = require('express');
const path = require('path');
const attack = require('../attack');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('hello');
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/attack', (req, res) => {
  console.log('This is req.body', typeof req.body.url);
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

const PORT = 4321;

app.listen(PORT, () => {
  console.log('You are listening on: ', PORT);
});
