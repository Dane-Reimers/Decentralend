pragma solidity ^0.5.0;


contract lendingGroup {
  struct Request {
    int requested;
    int totalFulfilled;
  }

  address[] members;
  string name;
  address owner;
  mapping (address => int) balances;
  mapping (address => Request) requests;

  event newRequest (
    uint amountRequested
  );

  constructor(string memory _name, address _owner) public {
    name = _name;
    owner = _owner;
  }

  function addMember (address member) public {
    members.add(member);
    balances[member] = 0;
    requests[member] = Request(0, 0);
  }

  function requestMoney ()
}
