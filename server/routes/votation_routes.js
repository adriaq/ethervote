exports.getVotations = function(req, res, next) {
    console.log("Llistat amb totes les votacions que s'han fet");
    res.json([{
        id: 1,
        name: "USA PRESIDENT"
    }, {
        id: 2,
        name: "CEO ELECTION"
    }, {
        id: 3,
        name: "MY DOG'S NAME"
    }, {
        id: 4,
        name: "NEW HARRY POTTER FILM?"
    }, {
        id: 5,
        name: "SHOULD TAXES INCREASE?"
    }, {
        id: 6,
        name: "GRUPS FESTA FIB 2018"
    }]);
};

exports.getUserOpenVotations = function(req, res, next) {
    console.log('Informació votacions obertes usuari');
    res.json([{
        id: 1,
        name: "USA PRESIDENT"
    }, {
        id: 2,
        name: "MY DOG'S NAME"
    }, {
        id: 3,
        name: "NEW HARRY POTTER FILM?"
    }, {
        id: 4,
        name: "SHOULD TAXES INCREASE?"
    }]);
};

exports.getUserClosedVotations = function(req, res, next) {
    console.log('Informació votacions acabades usuari');
    res.json([{
        id: 6,
        name: "GRUPS FESTA FIB 2018"
    }]);
};

exports.getAdminVotations = function(req, res, next) {
    var id = req.params.userId;
    console.log('Llistat amb totes les votacions en les que ha participat un usuari');
    res.json([{
        id: 1,
        name: "CEO ELECTION"
    }, {
        id: 2,
        name: "SHOULD TAXES INCREASE?"
    }]);
};
