const Horseman = require('node-horseman');
const jsdom = require('jsdom');
const index = require('./index.js');

const horseman = new Horseman();
const { JSDOM } = jsdom;
const { config } = index;

const PORT = config.url;
const URI = `https://localhost:${PORT}`;

// Browser Engines:
// - Mozilla/5.0 (Windows NT 6.1; WOW64)
// - AppleWebKit/537.36 (KHTML, like Gecko)
// - Chrome/37.0.2062.120 Safari/537.36
const xssInjection = {};
xssInjection.targetA = () =>
  horseman
    .userAgent('Mozilla/5.0 Chrome/37.0.2062.120 AppleWebKit/537.36')
    .open(URI)
    .html()
    .then((body) => {
      const dom = new JSDOM(body);
      const aTag = dom.window.document.getElementsByTagName('a');
      console.log('***************This is a***************');
      for (let x = 0; x < aTag.length; x += 1) {
        console.log('This is a tag\'s link: ', aTag[x].getAttribute('href'));
      }
      console.log('****************************************************');
    })
    .close();

horseman.close();
module.exports = xssInjection;
