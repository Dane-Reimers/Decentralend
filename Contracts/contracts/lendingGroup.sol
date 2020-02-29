pragma solidity >=0.5.0;


contract LendingGroup {

  struct Request {
    uint requested;
    int totalFulfilled;
  }

  struct Member {
    string name;
    string physAddress;
    string phoneNumber;
  }

  string name;
  address owner;
  address[] memberAddress;
  mapping (address => Member) members;
  mapping (address => int) balances;
  mapping (address => Request) requests;

  event newRequest (
    uint amountRequested
  );

  constructor(string memory _name) public {
    name = _name;
    owner = msg.sender;
  }

  function addMember (address _memberAddress, string memory name,
                      string memory phoneNumber, string memory physAddress) public {
    memberAddress.push(_memberAddress);
    members[_memberAddress] = Member(
            name,
            physAddress,
            phoneNumber
    );
    balances[_memberAddress] = 0;
    requests[_memberAddress] = Request(0, 0);
  }

  function requestMoney (uint amount) public {
    requests[msg.sender] = Request(amount, 0);
  }
}
