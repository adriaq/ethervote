const express = require('express');
const router = express.Router();


router.get('/admin/', function(req, res, next) {
    console.log('Llistat amb tots els administradors');
    res.send('OK');
};

router.get('/admin/:adminId', function(req, res, next) {
    var id = req.params.adminId;
    console.log('Informació admin');
    res.send('OK');
};

module.exports = router;

