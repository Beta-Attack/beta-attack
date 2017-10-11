const xssInjection = require('./xss-injection.js');
const xssScripts = require('./xss-scripts.js');
const sqlScripts = require('./sql-scripts.js');
const request = require('request');
const init = require('./init.js');

const attack = {};

attack.targetFormInput = async function (url) {
  const result = [];
  /* --- Generate all XSS script --- */
  const XSSScripts = xssScripts.makeScripts(url);
  const inputFields = await init.getForm(url);
  /* --- Apply vectors to all input fields --- */
  async function traverseInputs(inputFieldsNums, xss) {
    let index = inputFieldsNums;
    if (index < 0) return;
    await xssInjection
      .targetFormInput(xss, url, inputFields[0])
      .then((response) => {
        result.push(...response);
      });
    index -= 1;
    await traverseInputs(index, xss);
  }
  await traverseInputs(inputFields.length - 1, XSSScripts);
  return result;
};

attack.targetURLField = async function (URL) {
  const result = [];
  /* --- Generate SQL injection scripts with specified delay --- */
  const SQLScripts = sqlScripts.makeScripts(3);
  const qurl = await init.getQueryURLs(URL);
  function checkDelay(requestURL) {
    return new Promise((resolve) => {
      const start = Date.now();
      request(requestURL, () => {
        const end = Date.now();
        resolve(end - start);
      });
    });
  }
  const delaySQL = [];
  for (let x = 0; x < qurl.length; x += 1) {
    const currentURL = qurl[x];
    for (let s = 0; s < SQLScripts[0].length; s += 1) {
      const delayResult = checkDelay(currentURL + SQLScripts[0][s]);
      delaySQL.push(delayResult);
    }
  }
  const delayMySQL = [];
  for (let x = 0; x < qurl.length; x += 1) {
    const currentURL = qurl[x];
    for (let s = 0; s < SQLScripts[1].length; s += 1) {
      const delayResult = checkDelay(currentURL + SQLScripts[1][s]);
      delayMySQL.push(delayResult);
    }
  }
  const delayPsql = [];
  for (let x = 0; x < qurl.length; x += 1) {
    const currentURL = qurl[x];
    for (let s = 0; s < SQLScripts[1].length; s += 1) {
      const delayResult = checkDelay(currentURL + SQLScripts[1][s]);
      delayPsql.push(delayResult);
    }
  }
  /* --- Take on dimensional array into two dimensional array --- */
  function formatResponseResult(timeArr) {
    const r = [];
    let sumTime = 0;
    for (let x = 0; x < timeArr.length; x += 1) {
      sumTime += timeArr[x];
    }
    const avgTime = sumTime / timeArr.length;
    if (avgTime < 3000) {
      /* --- outterIdx references to specific URL --- */
      let outterIdx = 0;
      /* --- innerIdx references to specific sql command --- */
      let innerIdx = 0;
      for (let x = 0; x < timeArr.length; x += 1) {
        if (timeArr[x] > 3000) {
          r.push([outterIdx, innerIdx]);
        }
        innerIdx += 1;
        if (innerIdx === 6) {
          innerIdx = 0;
          outterIdx += 1;
        }
      }
    }
    return r;
  }
  /* --- Try inject SQL command --- */
  const sqlDelayResponse = await Promise.all(delaySQL);
  const sqlResult = formatResponseResult(sqlDelayResponse);
  if (sqlResult.length !== 0) {
    for (let x = 0; x < sqlResult.length; x += 1) {
      result.push({
        script: SQLScripts[0][sqlResult[x][1]],
        url: qurl[sqlResult[x][1]],
      });
    }
  }
  /* --- Try inject mySQL command --- */
  const mySqlDelayResponse = await Promise.all(delayMySQL);
  const mySqlResult = formatResponseResult(mySqlDelayResponse);
  if (mySqlResult.length !== 0) {
    for (let x = 0; x < mySqlResult.length; x += 1) {
      result.push({
        script: SQLScripts[0][mySqlResult[x][1]],
        url: qurl[mySqlResult[x][1]],
      });
    }
  }
  /* --- Try inject pSQL command --- */
  const psqlDelayResponse = await Promise.all(delayPsql);
  const psqlResult = formatResponseResult(psqlDelayResponse);
  if (psqlResult.length !== 0) {
    for (let x = 0; x < psqlResult.length; x += 1) {
      result.push({
        script: SQLScripts[0][psqlResult[x][1]],
        url: qurl[psqlResult[x][1]],
      });
    }
  }
  return result;
};

/* --- Run attack when message is received from parent (server/server.js) --- */
process.on('message', (url) => {
  /* --- Get all the query URL --- */
  const sqlResult = new Promise((resolve) => {
    attack.targetURLField(url).then((result) => {
      resolve(result);
    });
  });
  /* --- Get all the url associated with user page --- */
  init.getURLs(url)
    .then((hrefs) => {
      const allAttack = [];
      /* --- Target input field in every form --- */
      hrefs.forEach((href) => {
        allAttack.push(attack.targetFormInput(href));
      });
      /* --- Send result back to parent when complete --- */
      Promise.all(allAttack).then((r) => {
        const result = {};
        const xssResult = [];
        r.forEach((urls) => {
          urls.forEach((injection) => {
            xssResult.push(injection);
          });
        });
        result.xss = xssResult;
        sqlResult.then((sqlresult) => {
          result.sql = sqlresult;
          process.send(result);
          process.exit(0);
        });
      });
    });
});
