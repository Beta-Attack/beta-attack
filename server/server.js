const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { fork } = require('child_process');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/attack', (req, res) => {
  let url = null;
  if (typeof req.body.url === 'string') url = req.body.url;
  else res.end('Invalid Input');
  const beginAttack = fork(path.join(__dirname, '../attack/attack.js'));
  beginAttack.send(url);
  beginAttack.on('message', (result) => {
    res.send(result);
  });
});

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/dist/style/img', express.static(path.join(__dirname, '../dist/img')));
app.use('/img', express.static(path.join(__dirname, '../dist/img')));

const PORT = 4321;

app.listen(PORT, () => {
  console.log('You are listening on: ', PORT);
});
