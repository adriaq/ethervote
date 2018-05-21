import ethervote from '../app.js';

exports.getUserOpenedPolls =  function(req, res) {
    let id = req.params.publicKey;

    let num_proposals = ethervote.getNumberOfProposals();
    let proposals = [];
    for(let i=1; i<=num_proposals; ++i) {
        if(!ethervote.hasEnded(i)) {
            let name = ethervote.getProposalName(i);
            let description = ethervote.getProposalDescription(i);
<<<<<<< HEAD
            let num_opcions = ethervote.getNumberOfOptions(i).;
=======
            let num_opcions = ethervote.getNumberOfOptions(i);
>>>>>>> a8bf7eb1ba3050599dad8fd692074471917d39ae

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

<<<<<<< HEAD


    let num_proposals = ethervote.getNumberOfProposals(); //BigNumber { s: x, e: y, c: [ z ] } -> c es el que es necessita
    let proposals = [];
    for(let i=0; i<num_proposals; ++i) {
        if(ethervote.hasEnded(i)) { //retorna tal qual true or false
            let name = ethervote.getProposalName(i); //retorna tal qual el nom
            let description = ethervote.getProposalDescription(i); //retorna tal qual la descripció
            let num_opcions = ethervote.getNumberOfOptions(i); //BigNumber { s: x, e: y, c: [ z ] } -> c es el que es necessita

            let options = [];
            for(let j=1; j<=num_opcions; ++j) {
                let option_name = ethervote.getOptionName(i, j); //retorna tal qual el nom
                let option_description = ethervote.getOptionDescription(i, j); //retorna tal qual la descripció
                let option_votes = ethervote.getNumberOfVotes(i, j); //BigNumber { s: x, e: y, c: [ z ] } -> c es el que es necessita
=======
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
>>>>>>> a8bf7eb1ba3050599dad8fd692074471917d39ae

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
    let key = req.params.publicKey;
    let id = req.params.proposalID;
    let option = req.params.option;
    bool v = false;
    if(!ethervote.hasVoted(key, id)) { //retorna tal qual true or false
        ethervote.vote(id, option); //no retorna res important
        v = true;
    }


    //retorna v
    res.status(200).send('OK');
};

