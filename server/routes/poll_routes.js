exports.getPoll = function(req, res) {
    let id = req.params.id;
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
    }]);
};

