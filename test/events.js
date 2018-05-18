var Charge = artifacts.require("Charge");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('Charge', async(accounts) => {

  let charge;
  const account0 = accounts[0];
  const account1 = accounts[1];


  beforeEach(async () => {
    charge = await Charge.new({from: account0});
  });

  afterEach(async () => {
    await charge.kill({from: account0});
  });

  it("should increment charge record count when adding record", async () => {
    let tx0 = await charge.count.call({from:account1});
    let tx1 = await charge.add_charge_record(2,{from:account1});
    let tx2 = await charge.count.call({from:account1});
    assert.equal(tx0.toNumber(), tx2.toNumber()-1);
//    console.log(tx0.toNumber());
//    console.log(tx1);
//    console.log(tx2.toNumber());
  });

  it("should emit event when adding charge record", async () => {

    var num = Number(Math.round((Math.random() * 60) + 1));
    let tx = await charge.add_charge_record(num,{from:account1});

    truffleAssert.eventEmitted(tx, 'AddedChargeRecord', (ev) => {
//console.log(ev);
      return ev.account === account1;
    });
  });

/*
  it("should emit Error event when sending 5 ether", function(done){
    var insurance = CarInsurance.deployed();

    insurance.send({from: accounts[0], value: web3.toWei(5, 'ether')}).then(function(txHash){
      assert.notEqual(txHash, null);
    }).then(done).catch(done);
  });

  it("should emit Error event when sending 5 ether", function(done){
    var insurance = CarInsurance.deployed();

    insurance.send({from: accounts[0], value: web3.toWei(5, 'ether')}).then(function(done){
      done();
    }).catch(done);
  });
*/

});
