const express = require('express');
const router = express.Router();

router.get('/smartContract/', function(req, res, next) {
    console.log('Llistat amb tots els smart-contracts');
    res.status(200).send('OK');
};

router.get('/smartContract/:smId', function(req, res, next) {
    var id = req.params.smId;
    console.log('Smart contract');
    res.status(200).send('OK');
};

router.post('/smartContract/:smId', function(req, res, next) {
    console.log('Post Smart contract to the Blockchain');
    res.status(200).send('OK');
};

module.exports = router;