pragma solidity ^0.5.0;

import './LendingGroup.sol';

contract LendingGroupManager {
  uint numGroups;
  mapping(uint => LendingGrouptr) groups;

  function createGroup(string memory name) public {
    LendingGroup newGroup = new LendingGroup(name, msg.sender);
    numGroups += 1;
    groups[numGroups] = newGroup;
  }

  function getNumGroups() public
    returns (int)
  {
      return numGroups;
  }

  function getGroup(int id) public
    returns (address)
  {
    return groups[id];
  }
}