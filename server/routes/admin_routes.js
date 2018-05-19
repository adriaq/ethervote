import ethervote from '../app.js';

/**
 * PRE: L'administrador ha emplenat el form (json) amb les opcions de la votació
 * POST: S'ha creat una nova votació amb l'smart contract instanciat
 */
exports.newPoll = function(req, res) {
    let name = req.params.name;
    let description = req.params.description;
    res.send('OK');
};

/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions obertes que ha creat
 */
exports.getOpenedPolls = function(req, res) {
    let id = req.params.publicKey;
    res.send('OK');
};

/**
 * PRE: Administador entra a la web
 * POST: json amb un llistat de les votacions tancades que ha creat
 */
exports.getClosedPolls = function(req, res) {
    let id = req.params.publicKey;
    res.send('OK');
};

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: L'usuari amb clau pública 'publicKey' pot votar
 */
exports.addVoter = function(req, res) {
    let id = req.params.publicKey;
    res.send('OK');
};

/**
 * PRE: L'administrador ja ha creat la votació
 * POST: S'ha afegit una opció nova a la votació
 */
exports.addOption = function(req, res) {
    let id = req.params.proposalID;
    let name = req.params.name;
    let description = req.params.description;
    res.send('OK');
};

