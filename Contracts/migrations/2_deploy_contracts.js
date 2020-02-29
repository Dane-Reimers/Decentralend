var LendingGroupManager = artifacts.require("./LendingGroupManager.sol");

module.exports = function(deployer) {
  deployer.deploy(LendingGroupManager);
};