const request = require('request');
const { JSDOM } = require('jsdom');

const init = {};

/* --- Get all the url associated with user page --- */
init.getURLs = function (url) {
  /* --- Main page URL --- */
  let baseURL = url;
  /* --- Root level domain --- */
  let rlDomain = null;
  /* --- Handle input with http protocol --- */
  if (baseURL.match(/:\/\//) !== null) {
    baseURL = baseURL.split('//');
    if (baseURL[1].match(/\//) !== null) {
      baseURL[1] = baseURL[1].split('/');
      baseURL[1] = baseURL[1][0];
    }
    baseURL = baseURL.join('//');
  } else {
    /* --- Handle input without http protocol --- */
    baseURL = baseURL.split('/');
    baseURL = `http://${baseURL[0]}`;
  }
  /* --- Handle localhost url structure --- */
  if (baseURL.match(/(localhost:)(?=\d)/)) {
    rlDomain = 'localhost';
  } else {
    rlDomain = baseURL.split('//');
    rlDomain = rlDomain[1];
    rlDomain = rlDomain.split('.');
    rlDomain = rlDomain[rlDomain.length - 2];
  }
  return new Promise((resolve, reject) => {
    request(baseURL, (error, response, body) => {
      if (error) reject('undefined');
      const hrefAll = [];
      const dom = new JSDOM(body);
      const href = dom.window.document.getElementsByTagName('a');
      rlDomain = new RegExp(`(${rlDomain}.)`);
      for (let x = 0; x < href.length; x += 1) {
        let tempHref = href[x].getAttribute('href');
        if (tempHref !== null) {
          /* --- Only push complete url --- */
          if ((tempHref.match(/^(http)/) !== null) && (tempHref.match(rlDomain) !== null)) {
            /* --- Remove all the duplicating URL --- */
            if (tempHref[tempHref.length - 1] === '/') {
              tempHref = tempHref.slice(0, tempHref.length - 1);
            }
            if (hrefAll.indexOf(tempHref) === -1) {
              hrefAll.push(tempHref);
            }
          }
          /* --- Add path to the base URL --- */
          if ((tempHref.match(/^(\/)/) !== null) && (tempHref.match(/^(\/\/)/) === null)) {
            hrefAll.push(`${baseURL}${tempHref}`);
          }
        }
      }
      resolve(hrefAll);
    });
  });
};

/* --- Get all the url with query string attached --- */
init.getQueryURLs = function (url) {
  return new Promise((resolve) => {
    this.getURLs(url)
      .then((urls) => {
        const queryURLs = urls.filter(uri => uri.match(/\?/) !== null);
        resolve(queryURLs);
      });
  });
};

/* --- Get all the input within a form element --- */
init.getForm = function (url) {
  return new Promise((resolve, reject) => {
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
};

module.exports = init;
