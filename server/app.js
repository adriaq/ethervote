import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';

import env from './config/env';

const admin_routes = require('./routes/admin_routes');
const audit_routes = require('./routes/audit_routes');
const smart_contract_routes = require('./routes/smart_contract_routes');
const user_routes = require('./routes/user_routes');
const votation_routes = require('./routes/votation_routes');

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
app.get('/admins/', admin_routes.getAdmins);
app.get('/admin/:adminId', admin_routes.getAdminInfo);

/********************* AUDIT ************************/
app.get('audit/:auditId', audit_routes.getAudit);

/***************** SMART CONTRACTS ******************/
app.get('/smartContracts/', smart_contract_routes.getSmartContracts);
app.get('/smartContract/:smId', smart_contract_routes.getSmartContract);
app.post('/smartContract/:smId', smart_contract_routes.postSmartContract);

/********************* USER *************************/
app.get('/users/', user_routes.getUsers);
app.get('/user/:userId', user_routes.getUserInfo);
app.get('/user/:userId/openVotes', user_routes.getUserOpenVotations);
app.get('/user/:userId/results', user_routes.getUserClosedVotations);

/******************* VOTATIONS **********************/
app.get('/votations/', votation_routes.getVotations);
app.get('/votation/:userId', votation_routes.getUserVotations);

/*=====  End of Routes  ======*/

// Load React App
// Serve HTML file for production
if (env.name === 'production') {
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

export default app;
