/**
 * web3 documentation: https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethcontract
 *//*
const Web3 = require('web3');
// create an instance of web3 using the HTTP provider.
// localhost:8545 port of the locally running Ethereum node software
global.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
*/


exports.getSmartContracts = function(req, res, next) {
    console.log('Llistat amb tots els smart-contracts');
    res.status(200).send('OK');
};

exports.getSmartContract = function(req, res, next) {
    var id = req.params.smId;
    console.log('Smart contract');
    res.status(200).send('OK');
};

exports.postSmartContract = function(req, res, next) {
    console.log('Post Smart contract to the Blockchain');
    /**
     * create contract
     * web3.eth.contract(abi);
     * abi->ABI array with descriptions of functions and events of the contract
     *  EXEMPLE AMB ETHERVOTE
     *  var abi = [{
             name: 'addVoter',
             type: 'function',
             constant: true,
             inputs: [{ name: '_voter', type: 'address' }, {name = 'int', type = '_privilege' }],
        }, {
             name: 'getPrivilege',
             type: 'function',
             constant: false,
             inputs: [{ name: '_voter', type: 'address' }],
             outputs: [{ name: 'privilege', type: 'int' }]
        }
        ...
        ];
     *
     * deploy contract
     * var contractInstance = MyContract.new([constructorParam1] [, constructorParam2], {data: '0x12345...', from: myAccount, gas: 1000000});
     */
    res.status(200).send('OK');
};
