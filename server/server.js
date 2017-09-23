const express = require('express');
const path = require('path');
const attack = require('../attack');

const app = express();

app.get('/', (req, res) => {
  console.log('hello');
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/attack', (req, res) => {
  attack
    .xssFormInput()
    .then((result) => {
      console.log('result in server: ', result);
      res.send(result);
    });
  console.log('inside attack');
});

app.use('/dist', express.static(path.join(__dirname, '../dist')));

const PORT = 4321;

app.listen(PORT, () => {
  console.log('You are listening on: ', PORT);
});
