import React from 'react';
import web3 from './Ethervote';

var ethervote
/************************ USER **********************/
export const getOpenedPolls = async () => {
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

            let p = {"id": i, "name": name, "description": description, "num_opcions": num_opcions, "options": options};
            proposals.push(p);
        }
    }
    return JSON.parse(proposals);
};

export const getClosedPolls = async() => {
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

            let p = {"id": i, "name": name, "description": description, "num_opcions": num_opcions, "options": options};
            proposals.push(p);
        }
    }
    return JSON.parse(proposals);
};

export const vote = async(key, id, option) => {
    let v = false;
    let voted = await ethervote.hasVoted(key, id); //retorna tal qual true or false
    if(!voted) {
        await ethervote.vote(id, option); //no retorna res important

        v = await ethervote.hasVoted(key, id);
    }

    //v si false hi ha hagut un error, 
    //ja sigui xq ya ha votat o perque no ha pogut votar per algo extrany
    return v;
};


/************************** ADMIN ****************************/
/**
 * PRE: L'administrador ha emplenat el form (json) amb les opcions de la votació
 * POST: S'ha creat una nova votació amb l'smart contract instanciat
 */
export const newPoll = async(name, description, date) => {
    let p1 = await ethervote.getNumberOfProposals();
    await ethervote.newProposal(name, description);
    let p2 = await ethervote.getNumberOfProposals();
    //parlar de date aquesta tarda

    return (p1+1 === p2);
};

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: L'usuari amb clau pública 'publicKey' pot votar
 */
export const addVoter = async(key, priv) => {
    let v1 = ethervote.getNumberOfVoters();
    await ethervote.addVoter(key, priv);
    let v2 = ethervote.getNumberOfVoters();

    return (v1+1 === v2);
};

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: S'ha afegit una opció nova a la votació
 */
export const addOptionToPoll = async(id, name, description) => {
    let n1 = ethervote.getNumberOfOptions(id);
    await ethervote.addOption(id, name, description);
    let n2 = ethervote.getNumberOfOptions(id);

    return (n1+1 === n2);
};

/************************* AQUESTES FUNCIONS JA ESTAN A USER ************************/
/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions obertes que ha creat
 */
/*
export const getOpenedPolls = async(id) => {
    //Al ser el mateix cens serà igual que per User
    return 1;
};
*/


/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions tancades que ha creat
 */
/*
export const getClosedPolls = async(id) => {
   //Al ser el mateix cens serà igual que per User
   return 1;
};
*/
/************************************************************************************/



/**************** SMART CONTRACT ***************/
export const deploySmartContract = async(addr) => {
    /**
     * create contract
     * web3.eth.contract(abi);
     * abi->ABI array with descriptions of functions and events of the contract
     * deploy contract
     * var contractInstance = MyContract.new([constructorParam1] [, constructorParam2], {data: '0x12345...', from: myAccount, gas: 1000000});
     */
    /* let input = {
         'ethervote.sol': fs.readFileSync(__dirname+'/smartcontract/ethervote.sol', 'utf8')
     };

     let compiled = solc.compile({sources: input}, 1);
     let abi = compiled.contracts['ethervote.sol:ethervote'].interface;
     let Ethervote = web3.eth.contract(JSON.parse(abi));
     let CURRENT_USER; //aquesta variable es la persona que fara la peticio cap a crear nou contract o existent, sha de canviar el nom i agafarla d'on toca
     let existing_ethervote, ethervote_nom, ethervote_default_time, maxGas;
     if (existing_ethervote) { //si el smart contract ja existeix
         ethervote = Ethervote.at(existing_ethervote);
     }
     else { // si no existeix
         ethervote = Ethervote.new(ethervote_nom,ethervote_default_time, {from: CURRENT_USER, gas: maxGas}, function(err, contract) {
             if (!err && contract.address){
                 console.log("deployed on:", contract.address);
             }
         });
     }*/
    return 1;
};

/********************** POLL *********************/
export const getPoll = async(id) => {
    let name = await ethervote.getProposalName(id);
    let description = await ethervote.getProposalDescription(id);
    let num_opcions = await ethervote.getNumberOfOptions(id);
    let options = [];
    for (let j = 1; j <= num_opcions; ++j) {
        let option_name = await ethervote.getOptionName(id, j);
        let option_description = await ethervote.getOptionDescription(id, j);
        let option_votes = await ethervote.getNumberOfVotes(id, j);

        let o = {"name": option_name, "description": option_description, "votes": option_votes};
        options.push(o);
    }

    let p = {"name": name, "description": description, "num_opcions": num_opcions, "options": options};
    return JSON.parse(p);

};

export const getPollOptions = async(id) => {
    let num_opcions = await ethervote.getNumberOfOptions(id);
    let options = [];
    for (let j = 1; j <= num_opcions; ++j) {
        let option_name = await ethervote.getOptionName(id, j);
        let option_description = await ethervote.getOptionDescription(id, j);
        let option_votes = await ethervote.getNumberOfVotes(id, j);

        let o = {"name": option_name, "description": option_description, "votes": option_votes};
        options.push(o);
    }
    return JSON.parse(options);

};