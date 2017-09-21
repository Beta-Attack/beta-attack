const Horseman = require('node-horseman');
const jsdom = require('jsdom');
const index = require('./index.js');
const SQLi = require('./sql-scripts');

const horseman = new Horseman();
const { JSDOM } = jsdom;
const { config } = index;
// const PORT = config.url;
const URI = 'http://us-123office.simplesite.com/410914471'; // `https://localhost:${PORT}`;

// Browser Engines:
// - Mozilla/5.0 (Windows NT 6.1; WOW64)
// - AppleWebKit/537.36 (KHTML, like Gecko)
// - Chrome/37.0.2062.120 Safari/537.36

console.log(config);

const sqli = () => {
  let attackDB;
  let count = 0;
  const attackMethod = { 0: 'M', 1: 'S', 2: 'P' };
  SQLi.fingerPrint.forEach((x) => {
    if (x === SQLi.test[count]) { // returns and compares error message to test messages){
      attackDB = attackMethod[count];
    }
    count += 1;
    if (count === 3) attackDB = 'G';
  });
  const parse = SQLi[attackDB][0];
  parse.Form.forEach((x) => {
    if (x) { // returns error){

    }
    else {
      parse.Form.shift();
    }
  });
  if (parse.DataChange.length !== 0) return 'Error';
  parse.DataChange.forEach((x) => {
    if (x) { // returns error){

    }
    else {
      parse.DataChange.shift();
    }
  });
  if (parse.DataChange.length !== 0) return 'Error';
  return "You're as clean as a button";
};

horseman
  .userAgent('Mozilla/5.0 Chrome/37.0.2062.120 AppleWebKit/537.36')
  .open(URI)
  .html()
  .then((body) => {
    const dom = new JSDOM(body);
    const input = dom.window.document.getElementsByTagName('input');
    const button = dom.window.document.getElementsByTagName('button');
    console.log('***************This is input***************');
    for (let x = 0; x < button.length; x += 1) {
      const checkMe = button[x].HTMLInputElement;
      console.log('This is a button field: ', button[x]);
    }
  })
  .type('input', `console.log(${sqli})`)
  .wait(3000)
  .close();

// const Horseman = require('node-horseman');
// const jsdom = require('jsdom');
// const index = require('./index.js');

// const horseman = new Horseman();
// const { JSDOM } = jsdom;
// const { config } = index;

// // const PORT = config.url;
// const URI = `http://us-123office.simplesite.com/410914471`; //`https://localhost:${PORT}`;

// // Browser Engines:
// // - Mozilla/5.0 (Windows NT 6.1; WOW64)
// // - AppleWebKit/537.36 (KHTML, like Gecko)
// // - Chrome/37.0.2062.120 Safari/537.36

// console.log(config);

// horseman
//   .userAgent('Mozilla/5.0 Chrome/37.0.2062.120 AppleWebKit/537.36')
//   .open(URI)
//   .html()
//   .then((body) => {
//     const dom = new JSDOM(body);
//     const inputTag = dom.window.document.getElementsByTagName('input');
//     const butTag = dom.window.document.getElementsByTagName('button');    
//     console.log('***************This is input***************');
//     for (let x = 0; x < butTag.length; x += 1) {
//       let checkMe = butTag[x].HTMLInputElement;
//       console.log('This is a tag\'s link: ', butTag[x]);
//       console.log(x + 1)
//     }
//     console.log('****************************************************');
//   })
//   // .click(butTag)
//   // .keyboardEvent('keypress', 16777221)
//   .close();

/*
  sqli = () => {
  let attackDB;
  let count = 0;
  const attackMethod = { 0: 'M', 1: 'S', 2: 'P' };
  SQLi.fingerPrint.forEach((x) => {
    if (x) { // returns error){
      attackDB = attackMethod[count];
    }
    count += 1;
    if (count === 3) attackDB = 'G';
  });
  attackDB.Form.forEach((x) => {
    if (x) { // returns error){

    }
    else {
      attackDB.Form.shift();
    }
  });
  if (attackDB.Form.length !== 0) return 'Error';
  attackDB.DataChange.forEach((x) => {
    if (x) { // returns error){

    }
    else {
      attackDB.DataChange.shift();
    }
  });
  if (attackDB.DataChange.length !== 0) return 'Error';
  return "You're as clean as a button";
};
  */
