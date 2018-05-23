import React from 'react';

var ethervote;
/************************ USER **********************/

export const getUserOpenedPolls = async () => {
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

};

export const getUserClosedPolls = async() => {
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
};

export const vote = async(key, id, option) => {
    let v = false;
    let voted = await ethervote.hasVoted(key, id);
    if(!voted) { //retorna tal qual true or false
        await ethervote.vote(id, option); //no retorna res important
        v = true;
    }


    //retornar v
};


/************************** ADMIN ****************************/
/**
 * PRE: L'administrador ha emplenat el form (json) amb les opcions de la votació
 * POST: S'ha creat una nova votació amb l'smart contract instanciat
 */
export const newPoll = async(name, description) => {
    await ethervote.newProposal(name, description);
    // TODO: saber com retorna si s'ha pogut crear l'event
};

/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions obertes que ha creat
 */
export const getOpenedPolls = async(id) => {
   return 1;
};

/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions tancades que ha creat
 */
export const getClosedPolls = async(id) => {
    return 1;
};

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: L'usuari amb clau pública 'publicKey' pot votar
 */
export const addVoterToPoll = async(id, priv) => {
    let added = await ethervote.addVoter(id, priv);
    if(added) return 1;
    else return 0;
};

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: S'ha afegit una opció nova a la votació
 */
export const addOptionToPoll = async(id, name, description) => {
    let opt = ethervote.addOption(id, name, description);
    if (opt === -1) return 1;
    else return 0;
};


/**************** SMART CONTRACT ***************/
export const createSmartContract = async() => {
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
export const getPoll =  async(id) => {
    console.log("FUNCIONA IMPORT");
    return 0;
};