var Charge = artifacts.require("Charge");

/*
Charge.deployed().then(function(instance) {
  console.log(instance);
});
*/

contract('Charge', function(accounts) {

  console.log(accounts)
  console.log(web3.eth.getBalance(accounts[0]))

  it("owner was " + accounts[0], function() {
    return Charge.deployed().then(function(instance) {
      return instance.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[0], accounts[0] + " wasn't owner");
    });
  });

  it("Added 1 record", function() {
    return Charge.deployed().then(function(instance) {
//      return instance.add_charge_record("2018-01-01","18:56","120");
      return instance.add_charge_record("120");
    }).then(function(result) {
//console.log(result);
      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];
        console.log(log.args.count.toString());
        console.log(log.args.account);
        console.log(log.args.timestamp.toString());
        console.log(log.args.duration.toString());
      }

//      assert.equal(count, 0, count, + " wasn't 0");
    });
  });
  for(var i=0; i<2; i++) {
    it("Added record", function() {
      return Charge.deployed().then(function(instance) {
 //       return instance.add_charge_record(Math.floor((Math.random() * 60) + 1));
          var num = Number(Math.round((Math.random() * 60) + 1));
console.log(num);
        return instance.add_charge_record(num,{from:accounts[1]});
      }).then(function(result) {
        console.log(result.logs[0].args);
      });
    });
    it("Added record", function() {
      return Charge.deployed().then(function(instance) {
 //       return instance.add_charge_record(Math.floor((Math.random() * 60) + 1));
          var num = Number(Math.round((Math.random() * 60) + 1));
//console.log(num);
        return instance.add_charge_record(num);
      }).then(function(result) {
        console.log(result.logs[0].args);
        console.log(result.logs[0]);
      });
    });
  }

  it("contract addr returned " + Charge.address, function() {
    console.log(Charge.address);
    return Charge.deployed().then(function(instance) {
      assert.equal(instance.address, Charge.address, "address wasn't the same");
      console.log("addr: " + instance.address);
//      console.log(instance.allEvents);

      var filter = web3.eth.filter({fromBlock:1, toBlock:'latest'});
//      filter.get();
/*
      filter.get(function(err,res){
        console.log(err)
        console.log(res)
      });
*/
//      filter.get(function(err,results) {
//        console.log(results);
//      });
    });
  });

/*
  it("timestamp: " + web3.eth.filter(web3.eth.blockNumber).timestamp, function() {
    return web3.eth.getBlock(web3.eth.blockNumber).timestamp;
    return Charge.deployed().then(function(instance) {
      return instance.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[0], accounts[0] + " wasn't owner");
    });
  });
*/

/*
  it("count == 0 " + accounts[1], function() {
    return Charge.deployed().then(function(instance) {
      return instance.count.call();
    }).then(function(count) {
      assert.equal(count, 0, count, + " wasn't 0");
    });
  });
*/

});
