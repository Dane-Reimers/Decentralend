pragma solidity ^0.5.0;

import './LendingGroup.sol';


contract LendingGroupManager {
	uint numGroups;
	mapping(uint => address) groups;

	function createGroup(string memory name) {
		LendingGroup newGroup = new LendingGroup(name, msg.sender);
		numGroups += 1;
		groups[numGroups] = newGroup;
	}

}