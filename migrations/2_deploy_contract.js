var Ethervote = artifacts.require("ethervote");
module.exports = function(deployer) {
    deployer.deploy(Ethervote,"test",300);
};
