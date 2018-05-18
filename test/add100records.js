var Charge = artifacts.require("Charge");

contract('Charge', function(accounts) {

  console.log(accounts)
  console.log(web3.eth.getBalance(accounts[0]))

  for(var i=0; i<50; i++) {
    it("Added record", function() {
      return Charge.deployed().then(function(instance) {
          var num = Number(Math.round((Math.random() * 60) + 1));
        return instance.add_charge_record(num,{from:accounts[1],gas:500000});
      }).then(function(result) {
        console.log(result.logs[0].args);
      });
    });
    it("Added record", function() {
      return Charge.deployed().then(function(instance) {
          var num = Number(Math.round((Math.random() * 60) + 1));
//console.log(num);
        return instance.add_charge_record(num,{from:accounts[0],gas:500000});
      }).then(function(result) {
        console.log(result.logs[0].args);
        console.log(result.logs.length);
//        console.log(result.logs[0]);
      });
    });
  }

  Charge.deployed().then(charge => {
    const allEvents = charge.allEvents({
      fromBlock: 0,
      toBlock: 'latest'
    });
    allEvents.get((err, logs) => {
      console.log(err, logs);
    });
  })

});
