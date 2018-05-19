import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import Web3 from 'web3'

import env from './config/env';

const fs = require('fs');

const admin_routes = require('./routes/admin_routes');
const audit_routes = require('./routes/audit_routes');
const smart_contract_routes = require('./routes/smart_contract_routes');
const user_routes = require('./routes/user_routes');
const poll_routes = require('./routes/poll_routes');

const app = express();
var router = express.Router();

/*==================================
=            Middleware            =
==================================*/
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(compression());
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// serve static files, this is for frontend React
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

/*=====  End of Middleware  ======*/

/*===========================================
=            Basic Authentication            =
===========================================*/

//app.use(require('node-basicauth')({'haochuan': 'password'}));

/*=====  End of Baic Authentication  ======*/

/*===========================
=            COR            =
===========================*/

// app.use(require('cors')());

/*=====  End of COR  ======*/

/*===========================
=           ROUTES          =
===========================*/
//app.use('/api/v1', routes.api_v1);
//app.use('/page', routes.page);

/********************* ADMIN ************************/
app.post('/admin/newPoll', admin_routes.newPoll);
app.get('/admin/:publicKey/openedPolls', admin_routes.getOpenedPolls);
app.get('/admin/:publicKey/closedPolls', admin_routes.getClosedPolls);
app.post('/admin/:publicKey/addVoter', admin_routes.addVoter);

/********************* AUDIT ************************/
app.get('audit/:auditId', audit_routes.getAudit);

/***************** SMART CONTRACTS ******************/
app.post('/smartContract/:smId', smart_contract_routes.createSmartContract);

/********************* USER *************************/
app.get('/user/:publicKey/openedPolls', user_routes.getUserOpenedPolls);
app.get('/user/:publicKey/closedPolls', user_routes.getUserClosedPolls);
app.post('/user/:publicKey/vote', user_routes.vote);

/********************* POLL ************************/
app.get('/poll/:id', poll_routes.getPoll);

/*=====  End of Routes  ======*/


/* WEB3 */
let web3 = require("web3");
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else { // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

const solc = require('solc');
var ethervote;
function deploy_ethervote(){
    var source = fs.readFile(__dirname+'/smartcontract/ethervote.sol', function (err,source) {
      if (err) return console.log(err);
    });*/
    let input = {
        'ethervote.sol': fs.readFileSync(__dirname+'/smartcontract/ethervote.sol', 'utf8')
    };
    //let compiled = web3.eth.compile.solidity(source);
    let compiled = solc.compile({sources: input}, 1);
    //let code = compiled.ethervote.code;
    //let abi = compiled.ethervote.info.abiDefinition;
    let abi = compiled.contracts['ethervote.sol:ethervote'].interface;
    let Ethervote = web3.eth.contract(JSON.parse(abi));

    //let Ethervote = web3.eth.contract(abi);
    //var ethervote;
    let CURRENT_USER; //aquesta variable es la persona que fara la peticio cap a crear nou contract o existent, sha de canviar el nom i agafarla d'on toca
    let existing_ethervote, ethervote_nom, ethervote_default_time, maxGas;
    if (existing_ethervote) { //si el smart contract ja existeix
        ethervote = Ethervote.at(existing_etherveote);
    }
    else { // si no existeix
        ethervote = Ethervote.new(ethervote_nom,ethervote_default_time, {from: CURRENT_USER, gas: maxGas}, function(err, contract) {
            if (!err && contract.address){
               console.log("deployed on:", contract.address);
            }
        });
    }
//}




// Load React App
// Serve HTML file for production
if (env.name === 'production') {
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

export default app;
