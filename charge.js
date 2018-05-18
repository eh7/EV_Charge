var express     = require('express');
var bodyParser  = require('body-parser')
var app         = express();
var path        = require('path');
var fs          = require('fs');
var Promise     = require('promise');
var morgan      = require('morgan');

var config      = require('./config'); 

var Web3  = require("web3");
var web3 = new Web3();
var ethereumjs_abi = require('ethereumjs-abi');

web3.setProvider(new web3.providers.HttpProvider(config.web3_provider))

var chargeEvents; // will hold the Charge contract events

app.set('superSecret', config.secret);
app.set('view engine', 'ejs');
//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use('/assets', express.static(path.join(__dirname + '/assets')))
app.set('view engine', 'ejs');
app.disable('etag');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var port = process.env.PORT || 8284; 
var host = process.env.HOST || "localhost";

var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

/*---------------------------------------------------------------------*/
var setupEvents = function() {
  return new Promise(function (resolve, reject) {

    var addr = config.contract_address;

    var abi =  config.contract_abi;

    var Charge = new web3.eth.Contract(abi, addr);

    var eventCount = 0;
    var chargeEvents = [];

    var allEvents = Charge.getPastEvents({fromBlock: 0, toBlock: 'latest'}, function(error, events) {

      if(error) reject(error);

      for(i=0;i<events.length;i++){

        var rawData = JSON.stringify(events[i].raw.data);

        rawData = rawData.replace(/^"0x/,'');

        rawData = rawData.replace(/"$/,'');

        var data = Buffer.from(rawData.match(/.{64}/g).join(''), 'hex');

        decoded = ethereumjs_abi.rawDecode(['uint256','address','uint256','uint256'], data);

        count     = web3.utils.toDecimal(decoded[0]);

        address   = "0x"+decoded[1];

        timestamp = web3.utils.toDecimal(decoded[2]);

        duration  = web3.utils.toDecimal(decoded[3]);

        chargeEvents.push({
                             eventId:eventCount,
                             count:count,
                             address:address,
                             timestamp:timestamp,
                             duration:duration,
                          });
        eventCount++;
      }

//      console.log(chargeEvents);

      resolve(chargeEvents);
    });
  });
};
/*---------------------------------------------------------------------*/

var promise = [];
promise.push(setupEvents());
Promise.all(promise)
  .then(results => {
  console.log("Events Data Loaded");
  chargeEvents = results[0];
});

/*---------------------------------------------------------------------*/

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  if (!req.session.token) {
    req.session.token = {}
  }

//  req.session.token["sessionData"] = "token";

  next()
});


app.listen(port,host, () => {
  console.log('Listening on port http://' + host + ":" + port + '!');
  console.log('Address with records: ' + config.accounts[0]);
  console.log('Address with records: ' + config.accounts[1]);
  for(i=2;i<config.accounts.length-2;i++)
    console.log('Address with NO records: ' + config.accounts[i]);
});

app.get('/', (req, res) => res.redirect(301, '/ChargeRecords'));

app.get('/ChargeRecords', function (req, res, next) {
  main(req, res);
});

app.post('/ChargeRecords', function (req, res, next) {
  main(req, res);
});
/*---------------------------------------------------------------------*/
function main(req, res) {

  var address = req.body.address || "";
  var data = {error:"",address:address}

  var rows = [];

  for(i=0;i<chargeEvents.length;i++) {
    if(chargeEvents[i].address ==  address) { 
//console.log(chargeEvents[i].address + " == " +  address);
//      console.log(chargeEvents[i]);
      rows.push(chargeEvents[i]);
    }
  }
//  data.events = chargeEvents; 
  data.events =  rows;

//  console.log(req.session.token["sessionAddress"]);

  if(address == "") {

//    data.error = "token set";

    res.render('pages/login', data);

  } else {

    res.render('pages/records', data);

  }
}
/*---------------------------------------------------------------------*/
