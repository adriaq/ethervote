import ethervote from '../app.js';

/**
 * PRE: L'administrador ha emplenat el form (json) amb les opcions de la votació
 * POST: S'ha creat una nova votació amb l'smart contract instanciat
 */
exports.newPoll = async function(req, res) {
    let name = req.params.name;
    let description = req.params.description;
    await ethervote.newProposal(name, description);
    // TODO: saber com retorna si s'ha pogut crear l'event
    res.send('OK');
};

/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions obertes que ha creat
 */
exports.getOpenedPolls = async function(req, res) {
    let id = req.params.publicKey;
    res.send('OK');
};

/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions tancades que ha creat
 */
exports.getClosedPolls = async function(req, res) {
    let id = req.params.publicKey;
    res.send('OK');
};

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: L'usuari amb clau pública 'publicKey' pot votar
 */
exports.addVoter = async function(req, res) {
    let id = req.params.publicKey;
    let priv = req.params.privilegeLevel;
    let added = await ethervote.addVoter(id, priv);
    if(added) res.status(200).send('OK');
    else res.status(500).send('error adding user');
};

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: S'ha afegit una opció nova a la votació
 */
exports.addOption = function(req, res) {
    let id = req.params.proposalID;
    let name = req.params.name;
    let description = req.params.description;
    let opt = ethervote.addOption(id, name, description);
    if (opt === -1) res.status(500).send("error adding option");
    else res.status(200).send('OK');
};

