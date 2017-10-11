const Horseman = require('node-horseman');

const xssInjection = {};

xssInjection
  .targetFormInput = async function (script, url, inputs, idx = inputs.length - 1, result = []) {
    /* --- Exit if no form detected --- */
    if (inputs.length === 0) return 'No form found in the page.';
    /* --- Exit recursion if array length is 0 --- */
    if (idx < 0) {
      return result;
    }
    const xssScript = script;
    let inputsIndex = idx;
    /* --- Recursively fills input with all the xss scripts --- */
    async function fillInput(s = xssScript.length - 1) {
      let index = s;
      if (index < 0) return;
      /* --- Initia new user for phantomjs on every recursion --- */
      const horseman = new Horseman();
      await horseman
        .viewport(1024, 850)
        .on('consoleMessage', (msg) => {
          result.push({
            script: xssScript[index],
            attribute: 'name',
            value: inputs[inputsIndex],
            url: msg,
          });
        })
        .userAgent('Mozilla/5.0 Chrome/37.0.2062.120 AppleWebKit/537.36')
        /* --- open(URI) --- */
        .open(url)
        .mouseEvent('click', 0.1, 0.1)
        .mouseEvent('click', 1023.9, 0.1)
        .mouseEvent('click', 0.1, 849.9)
        .mouseEvent('click', 1023.9, 849.9)
        .wait(300)
        /* --- End --- */
        .type(`input[name=${inputs[inputsIndex]}]`, xssScript[index])
        .keyboardEvent('keypress', 16777221)
        .wait(500)
        .close();
      index -= 1;
      await fillInput(index);
    }
    await fillInput();
    inputsIndex -= 1;
    return this.targetFormInput(script, url, inputs, inputsIndex, result);
  };

module.exports = xssInjection;
