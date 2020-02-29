pragma solidity ^0.5.0;

import './LendingGroup.sol';

contract LendingGroupManager {
  uint numGroups;
  mapping(uint => LendingGroup) groups;

  function createGroup(string memory name) public {
    LendingGroup newGroup = new LendingGroup(name, msg.sender);
    numGroups += 1;
    groups[numGroups] = newGroup;
  }

  function getNumGroups() public view
    returns (uint)
  {
      return numGroups;
  }

  function getGroup(uint id) public view
    returns (LendingGroup)
  {
    return groups[id];
  }
}