var Charge = artifacts.require("Charge");

var ethereumjs_abi = require('ethereumjs-abi');

console.log(Charge.address);

contract('Charge', function(accounts) {

  var myStartblock = 0;
  var countCheck = 0;
  var thisInstance;

  it("check contract is deployed",() => {
    return Charge.deployed().then(function(instance) {
      thisInstance = instance;
      assert.equal(instance.address, Charge.address, "address wasn't the same");
      var myStartblock = web3.eth.blockNumber;
    });
  });

  it("check call count return 0 after initialization",() => {
    return Charge.deployed().then(function(instance) {
      return instance.count.call();
    }).then(function(count){
      assert.equal(count, 0, "initial count wasn't 0");
      countCheck = count;
    });
  });

  it("check call to add_charge_record returns results",() => {
//    var thisInstance;
    return Charge.deployed().then(function(instance) {
      thisInstance = instance;
      return thisInstance.count.call();
    }).then(function(count){
      var num = Number(Math.round((Math.random() * 60) + 1));
      return thisInstance.add_charge_record(num);
    }).then(function(results){
      countCheck++;
      for(i=0; i<results.logs.length; i++) {
        assert.equal(results.logs[i].args.count.toNumber(), 0, "count in add_charge_record call wasn't 0");
      }
    });
  });

  it("check call to add_charge_record increments the count to 1",() => {
    return Charge.deployed().then(function(instance) {
      return instance.count.call();
    }).then(function(count){
      assert.equal(count, 1, "after first call count wasn't 1");
      countCheck = count;
    });
  });

  it("check next call to add_charge_record returns results",() => {
    return Charge.deployed().then(function(instance) {
      thisInstance = instance;
      return thisInstance.count.call();
    }).then(function(count){
      var num = Number(Math.round((Math.random() * 60) + 1));
      return thisInstance.add_charge_record(num);
    }).then(function(results){
      countCheck++;
      for(i=0; i<results.logs.length; i++) {
        assert.equal(results.logs[i].args.count.toNumber(), 1, "count in add_charge_record call wasn't 1");
      }
    });
  });

  it("check next call to add_charge_record returns results",() => {
    return Charge.deployed().then(function(instance) {
      thisInstance = instance;
      return thisInstance.count.call();
    }).then(function(count){
      var num = Number(Math.round((Math.random() * 60) + 1));
      return thisInstance.add_charge_record(num);
    }).then(function(results){
      countCheck++;
      for(i=0; i<results.logs.length; i++) {
        assert.equal(results.logs[i].args.count.toNumber(), 2, "count in add_charge_record call wasn't 2");
      }
    });
  });

  it("add 30 add_charge_record records for " + accounts[0],(done) => {
    for(a=0;a<30;a++) {
      var num = Number(Math.round((Math.random() * 60) + 1));
      thisInstance.add_charge_record(num,{from:accounts[0]});
      countCheck++;
    }
    done();
  });

  it("add 30 add_charge_record records for " + accounts[1],(done) => {
    for(a=0;a<30;a++) {
      var num = Number(Math.round((Math.random() * 60) + 1));
      thisInstance.add_charge_record(num,{from:accounts[1]});
      countCheck++;
    }
    done();
  });

  it("get all contract event logs so far", (done) => {
    const allEvents = thisInstance.allEvents({fromBlock: myStartblock,toBlock: 'latest'});
    allEvents.get((err, results) => {
      if(err) console.log(err);
      for(i=0;i<results.length;i++) {
//        console.log("Block (event no. " + i + ") => " + results[i].blockNumber);
        console.log(
          "Block (event no. " + i + ") => " + results[i].blockNumber + ":\n" +
          results[i].args.count + "\n" +
          results[i].args.account + "\n" +
          results[i].args.timestamp + "\n" +
          results[i].args.duration + "\n"
        );
//        console.log(results[i].args)
      }
      console.log("Contract Address: " + thisInstance.address);
      done();
    })
  });

});
