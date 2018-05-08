var Ethervote = artifacts.require("./ethervote.sol");
module.exports = function(deployer) {
    deployer.deploy(Ethervote,"test",300);
};
