const xssInjection = require('./xss-injection.js');

const attack = {};
attack.config = {
  url: null,
};
attack.xss = () => {
  xssInjection.targetA();
};

module.exports = attack;
