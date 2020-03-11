pragma solidity >0.5.0;

import './LendingGroup.sol';

contract LendingGroupManager {
  //uint numGroups;
  mapping(address => LendingGroup[]) groups;
  mapping(string => address) accounts;

  function createGroup(string memory groupName, string memory ownerName) public {
    LendingGroup newGroup = new LendingGroup(groupName, ownerName, msg.sender);
    //numGroups += 1;
    groups[msg.sender].push(newGroup);
  }

  function getAddress(string memory _name) public view
    returns (address)
  {
      return accounts[_name];
  }

  function createAccount(string memory _name) public {
    accounts[_name] = msg.sender;
  }

  function accountExists() public view returns (bool) {
    return groups[msg.sender].length != 0;
  }

  function getGroup(uint id) public view
    returns (LendingGroup)
  {
    return groups[msg.sender][id];
  }
}