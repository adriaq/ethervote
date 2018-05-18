exports.getUserOpenedPolls =  function(req, res) {
    let id = req.params.publicKey;

    int num_proposals = ethervote.getNumberOfProposals();
    var proposals = [];
    for(int i=1; i<=num_proposals; ++i) {
        if(!ethervote.hasEnded(i)) {
            var name = ethervote.getProposalName(i);
            var description = ethervote.getProposalDescription(i);
            var num_opcions = ethervote.getNumberOfOptions(i);

            var options = [];
            for(int j=1; j<=num_opcions; ++j) {
                var option_name = ethervote.getOptionName(i, j);
                var option_description = ethervote.getOptionDescription(i, j);
                var option_votes = ethervote.getNumberOfVotes(i, j);

                var o = {"name": option_name, "description": option_description, "votes": option_votes};
                options.push(o);
            }            
            
            var p = {"name": name, "description": description, "num_opcions": num_opcions, "options": options};
            proposals.push(p);
        }
    }

    res.json(proposals);
};

exports.getUserClosedPolls = function(req, res) {
    let id = req.params.publicKey;

    int num_proposals = ethervote.getNumberOfProposals();
    var proposals = [];
    for(int i=0; i<num_proposals; ++i) {
        if(ethervote.hasEnded(i)) {
            var name = ethervote.getProposalName(i);
            var description = ethervote.getProposalDescription(i);
            var num_opcions = ethervote.getNumberOfOptions(i);

            var options = [];
            for(int j=1; j<=num_opcions; ++j) {
                var option_name = ethervote.getOptionName(i, j);
                var option_description = ethervote.getOptionDescription(i, j);
                var option_votes = ethervote.getNumberOfVotes(i, j);

                var o = {"name": option_name, "description": option_description, "votes": option_votes};
                options.push(o);
            }

            var p = {"name": name, "description": description, "num_opcions": num_opcions, "options": options};
            proposals.push(p);
        }
    }

    res.json(proposals);
};

exports.vote = function(req, res) {
    let id = req.params.proposalID;
    let option = req.params.option;
    
    ethervote.vote(id, option);

    res.status(200).send('OK');
};
