
var fs             = require('fs');

var fileName = './config.js.1';

var config = require(fileName);

console.log(config);
//console.log(config.contract_address);
//console.log(config.contract_abi);

config.contract_address = "address1";
config.contract_abi = "abi";

var newConfig = "module.exports = " + JSON.stringify(config) + ";";

console.log(newConfig);

fs.writeFile(fileName, JSON.stringify(config), function (err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(config));
  console.log('writing to ' + fileName);
});

/*
var seconds = 0;

if(String(seconds).length == 1) seconds = "0" + String(seconds);

console.log(seconds);
*/
