import React from 'react';

var ethervote;
/************************ USER **********************/

module.exports.getOpenedPolls = async () => {
        let num_proposals = await ethervote.getNumberOfProposals();
        let proposals = [];
        for(let i=1; i<=num_proposals; ++i) {
            let end = await ethervote.hasEnded(i);
            if(!end) {
                let name = await ethervote.getProposalName(i);
                let description = await ethervote.getProposalDescription(i);
                let num_opcions = await ethervote.getNumberOfOptions(i);
                let options = [];
                for (let j=1; j<=num_opcions; ++j) {
                    let option_name = await ethervote.getOptionName(i, j);
                    let option_description = await ethervote.getOptionDescription(i, j);
                    let option_votes = await ethervote.getNumberOfVotes(i, j);

                    let o = {"name": option_name, "description": option_description, "votes": option_votes};
                    options.push(o);
                }

                let p = {"name": name, "description": description, "num_opcions": num_opcions, "options": options};
                proposals.push(p);
            }
        }
        //return proposals
};

module.exports.getClosedPolls = async() => {
    let num_proposals = await ethervote.getNumberOfProposals(); //BigNumber { s: x, e: y, c: [ z ] } -> c es el que es necessita
    let proposals = [];
    for(let i=0; i<num_proposals; ++i) {
        let end = ethervote.hasEnded(i);
        if(end) { //retorna tal qual true or false
            let name = await ethervote.getProposalName(i); //retorna tal qual el nom
            let description = await ethervote.getProposalDescription(i); //retorna tal qual la descripció
            let num_opcions = await ethervote.getNumberOfOptions(i); //BigNumber { s: x, e: y, c: [ z ] } -> c es el que es necessita

            let options = [];
            for(let j=1; j<=num_opcions; ++j) {
                let option_name = await ethervote.getOptionName(i, j); //retorna tal qual el nom
                let option_description = await ethervote.getOptionDescription(i, j); //retorna tal qual la descripció
                let option_votes = await ethervote.getNumberOfVotes(i, j); //BigNumber { s: x, e: y, c: [ z ] } -> c es el que es necessita
                
                let o = {"name": option_name, "description": option_description, "votes": option_votes};
                options.push(o);
            }

            let p = {"name": name, "description": description, "num_opcions": num_opcions, "options": options};
            proposals.push(p);
        }
    }
    //return proposals
};

module.exports.vote = async(key, id, option) => {
    let v = false;
    let voted = await ethervote.hasVoted(key, id); //retorna tal qual true or false
    if(!voted) { 
        await ethervote.vote(id, option); //no retorna res important

        v = await ethervote.hasVoted(key, id); 
    }

    return v;
    //v si false hi ha hagut un error, 
    //ja sigui xq ya ha votat o perque no ha pogut votar per algo extrany
};


/************************** ADMIN ****************************/
/**
 * PRE: L'administrador ha emplenat el form (json) amb les opcions de la votació
 * POST: S'ha creat una nova votació amb l'smart contract instanciat
 */
module.exports.newPoll = async(name, description) => {
    var p1 = await getNumberOfProposals();
    await ethervote.newProposal(name, description);
    var p2 = await getNumberOfProposals();

    return (p1+1 == p2);
    // TODO: saber com retorna si s'ha pogut crear l'event

};

/************************* AQUESTES FUNCIONS JA ESTAN A USER ************************/
/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions obertes que ha creat
 */
/*
module.exports.getOpenedPolls = async(id) => {

    //Al ser el mateix cens serà igual que per User
    return 1;
};
*/
/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions tancades que ha creat
 */

 /*
module.exports.getClosedPolls = async(id) => {
    //Al ser el mateix cens serà igual que per User
    return 1;
};
*/
/************************************************************************************/

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: L'usuari amb clau pública 'publicKey' pot votar
 */
module.exports.addVoter = async(key, priv) => {
    var v1 = ethervote.getNumberOfVoters();
    await ethervote.addVoter(key, priv);
    var v2 = ethervote.getNumberOfVoters();
    return (v1+1 == v2);
};

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: S'ha afegit una opció nova a la votació
 */
module.exports.addOptionToPoll = async(id, name, description) => {
    var n1 = ethervote.getNumberOfOptions(id);
    await ethervote.addOption(id, name, description);
    var n2 = ethervote.getNumberOfOptions(id);
    return (n1+1 == n2);
};


/**************** SMART CONTRACT ***************/
module.exports.createSmartContract = async() => {
    /**
     * create contract
     * web3.eth.contract(abi);
     * abi->ABI array with descriptions of functions and events of the contract
     *  EXEMPLE AMB ETHERVOTE
     *  var abi = [{
             name: 'addVoter',
             type: 'function',
             constant: true,
             inputs: [{ name: '_voter', type: 'address' }, {name = 'int', type = '_privilege' }],
        }, {
             name: 'getPrivilege',
             type: 'function',
             constant: false,
             inputs: [{ name: '_voter', type: 'address' }],
             outputs: [{ name: 'privilege', type: 'int' }]
        }
     ...
     ];
     *
     * deploy contract
     * var contractInstance = MyContract.new([constructorParam1] [, constructorParam2], {data: '0x12345...', from: myAccount, gas: 1000000});
     */
    return 1;
};

/********************** POLL *********************/
module.exports.getPoll = async(id) => {
    let name = await ethervote.getProposalName(id);
    let description = await ethervote.getProposalDescription(id);
    let num_opcions = await ethervote.getNumberOfOptions(id);
    let options = [];
    for (let j=1; j<=num_opcions; ++j) {
        let option_name = await ethervote.getOptionName(i, j);
        let option_description = await ethervote.getOptionDescription(i, j);
        let option_votes = await ethervote.getNumberOfVotes(i, j);

        let o = {"name": option_name, "description": option_description, "votes": option_votes};
        options.push(o);
    }

    let p = {"name": name, "description": description, "num_opcions": num_opcions, "options": options};


    console.log("FUNCIONA IMPORT");
    //return p
    return 0;
};
