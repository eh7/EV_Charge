pragma solidity ^0.4.23;

contract Charge {

  address public owner;
  uint public count = 0;

  mapping (address => uint) balances;

  mapping (uint => address) user_address;
  mapping (uint => uint) timestamp;
  mapping (uint => uint) duration;

  event AddedChargeRecord(uint count, address account, uint timestamp, uint duration);

  constructor() public {
    owner = msg.sender;
  }

  function kill() external {
    require(msg.sender == owner, "Only the owner can kill this contract");
    selfdestruct(owner);
  }

  function add_charge_record(uint _duration) public {
    user_address[count] = msg.sender; 
    timestamp[count] = block.timestamp; 
    duration[count] = _duration; 
    emit AddedChargeRecord(count, msg.sender, timestamp[count], _duration);
    count++; 
  }

  function get_timestamp(uint _count) public view returns (uint){
    return timestamp[_count];
  }

  function get_duration(uint _count) public view returns (uint){
    return duration[_count];
  }

  function get_user_address(uint _count) public view returns (address){
    return user_address[_count];
  }

}
