exports.getUsers = function(req, res, next) {
    console.log('Llistat amb tots els usuaris');
    res.json([{
        id: 1,
        name: "Mar"
    }, {
        id: 2,
        name: "Adrià"
    }, {
        id: 3,
        name: "Jorge"
    }]);
};

exports.getUserInfo = function(req, res, next) {
    var id = req.params.userId;
    console.log('Informació user');
    res.status(200).send('OK');
};
