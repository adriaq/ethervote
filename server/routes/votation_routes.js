const express = require('express');
const router = express.Router();

router.get('/votation', function(req, res, next) {
    console.log("Llistat amb totes les votacions que s'han fet");
    res.json([{
        id: 1,
        name: "CEO ELECTION"
    }, {
        id: 2,
        name: "GRUPS FESTA FIB 2018"
    }]);
};

router.get('/votation/:userId', function(req, res, next) {
    var id = req.params.userId;
    console.log('Llistat amb totes les votacions en les que ha participat un usuari');
    res.status(200).send('OK');
};

module.exports = router;