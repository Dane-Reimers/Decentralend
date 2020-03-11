pragma solidity >0.5.0;


contract LendingGroup {

  struct Request {
    uint requested;
    uint totalFulfilled;
  }

  struct Member {
    string name;
    int balance;
  }

  string public name;
  address public owner;
  address[] memberAddress;
  mapping (address => Member) members;
  mapping (address => Request) requests;

  event newRequest (
    uint amountRequested
  );

  constructor(string memory _groupName, string memory _ownerName, address _owner) public {
    name = _groupName;
    owner = _owner;
    addMember(_owner, _ownerName);
  }

  function getRequest(address member) public view returns (uint256, uint256) {
      Request memory request = requests[member];
      return (request.requested, request.totalFulfilled);
  }

  function getBalance(address member) public view returns (int256) {
    return members[member].balance;
  }

  function getMember(address memberAdd) public view returns (string memory, int) {
    Member memory member = members[memberAdd];

    return (member.name, member.balance);

  }

  function getMemberAddresses() public view
    returns (address[] memory) {
      return memberAddress;
    }

  function memberInGroup(address questionable) public view returns (bool) {
    return bytes(members[questionable].name).length > 0;
  }

  function isOwner() public view returns (bool) {
    return msg.sender == owner;
  }

  function addMember (address _memberAddress, string memory _name) public {
    require (msg.sender == owner, "You must be the admin of this group");
    memberAddress.push(_memberAddress);
    members[_memberAddress] = Member(_name, 0);
    requests[_memberAddress] = Request(0, 0);
  }

  function requestMoney (uint amount) public {
    require (requests[msg.sender].requested == 0,
     "You have already requested money");
    requests[msg.sender] = Request(amount, 0);
  }

  function giveMoney (address member) public payable {
    address payable memberPayable = address (uint160(member));
    address payable payee = address (uint160(msg.sender));
    requests[member].totalFulfilled += msg.value;
    members[msg.sender].balance += int256(msg.value);

    if (requests[member].totalFulfilled >= requests[member].requested) {
      payOut(memberPayable, payee);
    }
  }

  function payOut (address payable payee,
  address payable payer) private {
    Request memory request = requests[payee];
    if (request.totalFulfilled > request.requested) {
      pay(payer, (request.totalFulfilled - request.requested));
    }
    requests[payee] = Request(0, 0);
    pay(payee, request.requested);
  }

  function pay(address payable receiver, uint256 amt) private {
    members[receiver].balance -= int256(amt);
    receiver.transfer(amt);
  }
}
