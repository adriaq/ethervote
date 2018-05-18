import ethervote from '../app.js';

exports.getUserOpenedPolls =  function(req, res) {
    let id = req.params.publicKey;

    let num_proposals = ethervote.getNumberOfProposals.call();
    let proposals = [];
    for(let i=1; i<=num_proposals; ++i) {
        if(!ethervote.hasEnded.call(i)) {
            let name = ethervote.getProposalName(i).call();
            let description = ethervote.getProposalDescription(i).call();
            let num_opcions = ethervote.getNumberOfOptions(i).call();

            let options = [];
            for (let j=1; j<=num_opcions; ++j) {
                let option_name = ethervote.getOptionName(i, j).call();
                let option_description = ethervote.getOptionDescription(i, j).call();
                let option_votes = ethervote.getNumberOfVotes(i, j).call();

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

    let num_proposals = ethervote.getNumberOfProposals().call();
    let proposals = [];
    for(let i=0; i<num_proposals; ++i) {
        if(ethervote.hasEnded(i)) {
            let name = ethervote.getProposalName(i).call();
            let description = ethervote.getProposalDescription(i).call();
            let num_opcions = ethervote.getNumberOfOptions(i).call();

            let options = [];
            for(let j=1; j<=num_opcions; ++j) {
                let option_name = ethervote.getOptionName(i, j).call();
                let option_description = ethervote.getOptionDescription(i, j).call();
                let option_votes = ethervote.getNumberOfVotes(i, j).call();

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
