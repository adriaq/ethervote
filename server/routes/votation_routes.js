exports.getVotations = function(req, res, next) {
    console.log("Llistat amb totes les votacions que s'han fet");
    res.json([{
        id: 1,
        name: "HOLA MAR"
    }]);
};

exports.getUserVotations = function(req, res, next) {
    var id = req.params.userId;
    console.log('Llistat amb totes les votacions en les que ha participat un usuari');
    res.status(200).send('OK');
};
