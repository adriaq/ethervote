import ethervote from '../app.js';

exports.getAudit = function(req, res) {
    var id = req.params.auditId;
    console.log('Results of audit asked by user');
    res.status(200).send('OK');
};