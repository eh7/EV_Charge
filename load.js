var addr = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';

var abi = [ { constant: true, inputs: [], name: 'count', outputs: [ [Object] ], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [ [Object] ], payable: false, stateMutability: 'view', type: 'function' }, { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [ [Object], [Object], [Object], [Object] ], name: 'AddedChargeRecord', type: 'event' }, { constant: false, inputs: [], name: 'kill', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [ [Object] ], name: 'add_charge_record', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [ [Object] ], name: 'get_timestamp', outputs: [ [Object] ], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [ [Object] ], name: 'get_duration', outputs: [ [Object] ], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [ [Object] ], name: 'get_user_address', outputs: [ [Object] ], payable: false, stateMutability: 'view', type: 'function' } ]; 

/* 
  web3 v 1.0.0. 
   var ChargeContract = new web3.eth.Contract(abi);
*/
var ChargeContract = web3.eth.contract(abi);

var ChargeInstance = ChargeContract.at(addr);

personal.unlockAccount(eth.accounts[0])
for(i=0;i<100;i++){
num = Number(Math.round((Math.random() * 60) + 1))
console.log(num);
ChargeInstance.add_charge_record(num,{from:eth.accounts[0],gas:500000});
}

