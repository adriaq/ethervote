const express = require('express');
const router = express.Router();

router.get('/user/', function(req, res, next) {
    console.log('Llistat amb tots els usuaris');
    res.status(200).send('OK');
};

router.get('/user/:userId', function(req, res, next) {
    var id = req.params.userId;
    console.log('Informació user');
    res.status(200).send('OK');
};

router.get('/user/:userId/openVotes', function(req, res, next) {
    console.log('Informació votacions obertes usuari');
    res.status(200).send('OK');
};

router.get('/user/:userId/results', function(req, res, next) {
    console.log('Informació votacions acabades usuari');
    res.status(200).send('OK');
};

module.exports = router
