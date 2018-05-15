exports.getUserOpenedPolls = function(req, res) {
    let id = req.params.publicKey;
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

exports.getUserClosedPolls = function(req, res) {
    let id = req.params.publicKey;
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

exports.vote = function(req, res) {
    let id = req.params.proposalID;
    let option = req.params.option;
    res.status(200).send('OK');
};
