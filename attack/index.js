const xssInjection = require('./xss-injection.js');
const xssScripts = require('./xss-scripts.js');
const config = require('./config.js');
const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;
const attack = {};

const getForm = url =>
  new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) reject(error);
      resolve(body);
    });
  });

attack.xssFormInput = async () => {
  let body = null;
  let form = null;
  const formClass = [];
  const formInputClass = [];
  let result = null;
  body = await getForm(config.url);
  const dom = new JSDOM(body);
  form = dom.window.document.getElementsByTagName('form');
  for (let x = 0; x < form.length; x += 1) {
    formClass.push(form[x].getAttribute('class'));
  }
  // for (let x = 0; x < formClass.length; x += 1) {
  //   // const input = dom.window.document.getElementsByClassName(formClass[x]);
  //   // console.log('This is the input: ', input);
  //   // console.log('This is all the childNodes: ', input[0].childNodes.length);
  // }
  console.log('This is formInputClass: ', formInputClass);
  await xssInjection
    .targetFormInput(xssScripts, formClass)
    .then((urls) => {
      result = urls;
    });
  return result;
};

attack.xssFormInput().then((result) => {
  console.log('This is the result: ', result);
});

module.exports = attack;
