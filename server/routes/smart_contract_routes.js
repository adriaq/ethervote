exports.getAllSmartContracts = function (req, res) {
    console.log('Llistat amb tots els smart-contracts');
    res.status(200).send('OK');
};

exports.getSmartContract = function (req, res) {
    var id = req.params.smId;
    console.log('Smart contract');
    res.status(200).send('OK');
};

exports.postSmartContract = function (req, res) {
    console.log('Post Smart contract to the Blockchain');
    res.status(200).send('OK');
};