/**
 * PRE: El futur administrador registra l'organització
 * POST: S'ha creat un smart-contract per la nova organització
 */
exports.createSmartContract = function(req, res) {
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
