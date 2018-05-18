var Charge = artifacts.require("Charge");

console.log(Charge.address);

contract('Charge', function(accounts) {

//  console.log(accounts)
//  console.log(web3.eth.getBalance(accounts[0]))

  it("contract addr returned " + Charge.address, function() {
//    console.log(Charge.address);
    return Charge.deployed().then(function(instance) {
      assert.equal(instance.address, Charge.address, "address wasn't the same");
      console.log("addr: " + instance.address);

      var filter = web3.eth.filter({fromBlock:1, toBlock:'latest'});
      filter.get(function(err,results) {
//        console.log(results.length);
        for(i = 0; i < results.length; i++) {
//          console.log(results[i]);
//          console.log(results[i].blockNumber);
//          console.log(results[i].address);
//          console.log(results[i].data);
        }
      });

//      var events = instance.allEvents({fromBlock: 0, toBlock: 'latest'});
//      events.get(function(error, logs){ console.log(logs.length); });

      
    });
  });

//      const allEvents = charge.getPastEvents({

  it("test allEvents for Charge", function() {

    Charge.deployed().then(charge => {
      var num = Number(Math.round((Math.random() * 60) + 1));
console.log(num);
      return charge.add_charge_record(num,{from:accounts[1]});
    }).then(function(result) {
      console.log(result.logs[0]);
console.log("added record");

    }).then(console.log(123));

  var watcher = Charge.Reward();

  // we'll send rewards
  contract.sendReward(1, 10000, {from: accounts[0]}).then(function() {
    return watcher.get();
  }).then(function(events) {
    // now we'll check that the events are correct
    assert.equal(events.length, 1);
    assert.equal(events[0].args.beneficiary.valueOf(), 1);
    assert.equal(events[0].args.value.valueOf(), 10000);
  }).then(done).catch(done);
});

    const allEvents = charge.allEvents({fromBlock: 0,toBlock: 'latest'});
    allEvents.watch((err, res) => {
      console.log(err, res);
console.log("logs");
    });

/* 
    Charge.deployed().then(charge => {
      const allEvents = charge.allEvents({fromBlock: 0,toBlock: 'latest'});
      console.log(allEvents);
      allEvents.get((err, res) => {
        console.log(err, res);
      });
console.log(321);
    });
*/
  });
});
