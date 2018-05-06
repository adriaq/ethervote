exports.getAudit = function(req, res, next) {
    var id = req.params.auditId;
    console.log('Results of audit asked by user');
    res.status(200).send('OK');
};