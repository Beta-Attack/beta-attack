const Horseman = require('node-horseman');

const xssInjection = {};

xssInjection
  .targetFormInput = async function (script, url, inputs, idx = inputs.length - 1, result = []) {
    // Exit if no form detected
    console.log('This is the url', url);
    if (inputs.length === 0) return 'No form found in the page.';
    // Base case for exiting recursion
    if (idx < 0) {
      return result;
    }
    const xssScript = script;
    let inputsIndex = idx;
    console.log('This is inputs: ', inputs);
    // Recursively fills input with all the xss scripts
    async function fillInput(s = xssScript.length - 1) {
      let index = s;
      console.log('Injected script: ', xssScript[index]);
      if (index < 0) return;
      // Initia new user for phantomjs on every recursion
      const horseman = new Horseman();
      await horseman
        .viewport(1024, 850)
        .on('consoleMessage', (msg) => {
          console.log('******This is msg******', msg);
          result.push({
            script: xssScript[index],
            attribute: 'name',
            value: inputs[inputsIndex],
            url: msg,
          });
        })
        .userAgent('Mozilla/5.0 Chrome/37.0.2062.120 AppleWebKit/537.36')
        // .open(URI)
        .open(url)
        .mouseEvent('click', 0.1, 0.1)
        .mouseEvent('click', 1023.9, 0.1)
        .mouseEvent('click', 0.1, 849.9)
        .mouseEvent('click', 1023.9, 849.9)
        // **** End ****
        .type(`input[name=${inputs[inputsIndex]}]`, xssScript[index])
        .keyboardEvent('keypress', 16777221)
        .wait(600)
        .close();
      index -= 1;
      return fillInput(index);
    }
    await fillInput();
    inputsIndex -= 1;
    console.log('This is url at the end: ', url);
    return this.targetFormInput(script, url, inputs, inputsIndex, result);
  };

module.exports = xssInjection;
