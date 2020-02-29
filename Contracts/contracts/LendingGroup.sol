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

  constructor(string memory _name, address _owner) public {
    name = _name;
    owner = _owner;
  }

  function addMember (address _memberAddress, string memory memberName,
                      string memory phoneNumber, string memory physAddress) public {
    memberAddress.push(_memberAddress);
    members[_memberAddress] = Member(
            memberName,
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
