const Horseman = require('node-horseman');
const jsdom = require('jsdom');
const index = require('./index.js');

const horseman = new Horseman();
const { JSDOM } = jsdom;
const { config } = index;

const PORT = config.url;
const URI = `https://localhost:${PORT}`;

<<<<<<< HEAD:attack/sql-injection.js
=======
const PORT = null
const URI = `https://localhost:${PORT}`;
>>>>>>> 7dcd3ae0cd365ea44f743c1e7c2b84835cf1a8df:tool/sql-injection.js
// Browser Engines:
// - Mozilla/5.0 (Windows NT 6.1; WOW64)
// - AppleWebKit/537.36 (KHTML, like Gecko)
// - Chrome/37.0.2062.120 Safari/537.36

console.log(config);

horseman
  .userAgent('Mozilla/5.0 Chrome/37.0.2062.120 AppleWebKit/537.36')
  .open(URI)
  .html()
  .then((body) => {
    const dom = new JSDOM(body);
    const inputTag = dom.window.document.getElementsByTagName('input');
    console.log('***************This is input***************');
    for (let x = 0; x < inputTag.length; x += 1) {
      console.log('This is a tag\'s link: ', inputTag[x].getAttribute('href'));
    }
    console.log('****************************************************');
  })
  .close();
