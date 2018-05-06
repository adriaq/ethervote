exports.getUsers = function(req, res, next) {
    console.log('Llistat amb tots els usuaris');
    res.status(200).send('OK');
};

exports.getUserInfo = function(req, res, next) {
    var id = req.params.userId;
    console.log('Informació user');
    res.status(200).send('OK');
};

exports.getUserOpenVotations = function(req, res, next) {
    console.log('Informació votacions obertes usuari');
    res.status(200).send('OK');
};

exports.getUserClosedVotations = function(req, res, next) {
    console.log('Informació votacions acabades usuari');
    res.status(200).send('OK');
};
