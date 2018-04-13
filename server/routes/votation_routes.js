exports.getAllVotations = function (req, res) {
    console.log("Llistat amb totes les votacions que s'han fet");
    res.status(200).send('OK');
};

exports.getUserVotations = function (req, res) {
    var id = req.params.userId;
    console.log('Llistat amb totes les votacions en les que ha participat un usuari');
    res.status(200).send('OK');
};