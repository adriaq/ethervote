exports.getAllUsers = function (req, res) {
    console.log('Llistat amb tots els usuaris');
    res.status(200).send('OK');
};

exports.getUser = function (req, res) {
    var id = req.params.userId;
    console.log('Informació user');
    res.status(200).send('OK');
};

exports.getOpenVotes = function (req, res) {
    console.log('Informació votacions obertes usuari');
    res.status(200).send('OK');
};

exports.getResults = function (req, res) {
    console.log('Informació votacions acabades usuari');
    res.status(200).send('OK');
};

