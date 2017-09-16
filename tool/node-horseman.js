
const Horseman = require('node-horseman');
const checklist = require('../checklist');

const horseman = new Horseman();
const { htmlList } = checklist;

horseman
  .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36')
  .open('http://soundcloud.com')
  .attribute('meta', htmlList.meta)
  .then((meta) => {
    console.log('Charset attribute is present: ', meta);
  })
  .close();
