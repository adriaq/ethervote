const express = require('express');
const router = express.Router();

router.get('audit/:auditId', function(req, res, next) {
    var id = req.params.auditId;
    console.log('Results of audit asked by user');
    res.status(200).send('OK');
};

module.exports = router;