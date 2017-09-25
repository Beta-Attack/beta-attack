const xssInjection = require('./xss-injection.js');
const xssScripts = require('./xss-scripts.js');
const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

const attack = {};
attack.url = null;

const getForm = url =>
  new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) reject(error);
      let form = null;
      const formInputClass = [];
      const dom = new JSDOM(body);
      form = dom.window.document.getElementsByTagName('form');
      for (let x = 0; x < form.length; x += 1) {
        for (let i = 0; i < form[x].children.length; i += 1) {
          const tempArr = [];
          if (form[x].children[i].getAttribute('type') === 'text') {
            tempArr.push(form[x].children[i].getAttribute('name'));
            formInputClass.push(tempArr);
          }
        }
      }
      resolve(formInputClass);
    });
  });

attack.injectFormInput = async (url) => {
  const result = [];
  const XSSScripts = xssScripts.scripts(url);
  console.log('This is XSSScripts: ', XSSScripts);
  const inputFields = await getForm(url);
  async function traverseInputs(i = inputFields.length - 1) {
    let index = i;
    if (index < 0) return;
    await xssInjection
      .targetFormInput(XSSScripts, url, inputFields[0])
      .then((response) => {
        result.push(...response);
      });
    index -= 1;
    return traverseInputs(index);
  }
  await traverseInputs();
  return result;
};

module.exports = attack;
