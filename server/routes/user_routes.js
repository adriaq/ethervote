import ethervote from '../app.js';

exports.getUserOpenedPolls =  function(req, res) {
    let id = req.params.publicKey;

    let num_proposals = ethervote.getNumberOfProposals();
    let proposals = [];
    for(let i=1; i<=num_proposals; ++i) {
        if(!ethervote.hasEnded(i)) {
            let name = ethervote.getProposalName(i);
            let description = ethervote.getProposalDescription(i);
            let num_opcions = ethervote.getNumberOfOptions(i);

            let options = [];
            for (let j=1; j<=num_opcions; ++j) {
                let option_name = ethervote.getOptionName(i, j);
                let option_description = ethervote.getOptionDescription(i, j);
                let option_votes = ethervote.getNumberOfVotes(i, j);

                let o = {"name": option_name, "description": option_description, "votes": option_votes};
                options.push(o);
            }            
            
            let p = {"name": name, "description": description, "num_opcions": num_opcions, "options": options};
            proposals.push(p);
        }
    }

    res.json(proposals);
};

exports.getUserClosedPolls = function(req, res) {
    let id = req.params.publicKey;

    let num_proposals = ethervote.getNumberOfProposals();
    let proposals = [];
    for(let i=0; i<num_proposals; ++i) {
        if(ethervote.hasEnded(i)) {
            let name = ethervote.getProposalName(i);
            let description = ethervote.getProposalDescription(i);
            let num_opcions = ethervote.getNumberOfOptions(i);

            let options = [];
            for(let j=1; j<=num_opcions; ++j) {
                let option_name = ethervote.getOptionName(i, j);
                let option_description = ethervote.getOptionDescription(i, j);
                let option_votes = ethervote.getNumberOfVotes(i, j);

                let o = {"name": option_name, "description": option_description, "votes": option_votes};
                options.push(o);
            }

            let p = {"name": name, "description": description, "num_opcions": num_opcions, "options": options};
            proposals.push(p);
        }
    }

    res.json(proposals);
};

exports.vote = function(req, res) {
    let id = req.params.proposalID;
    let option = req.params.option;

    // sendTransaction ??
    ethervote.vote.sendTransaction(id, option);

    res.status(200).send('OK');
};
