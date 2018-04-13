import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';

import env from './config/env';
import admin_routes from './routes';
import user_routes from './routes';
import smart_contract_routes from './routes';
import audit_routes from './routes';
import votation_routes from './routes';

const app = express();

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
=            Baic Authentication            =
===========================================*/

// app.use(require('node-basicauth')({'haochuan': 'password'}));

/*=====  End of Baic Authentication  ======*/

/*===========================
=            COR            =
===========================*/

// app.use(require('cors')());

/*=====  End of COR  ======*/

/*===========================
=           ROUTES          =
===========================*/
app.use('/api/v1', routes.api_v1);
app.use('/page', routes.page);

/********** Admin **********/
app.get('/admin/', admin_routes.getAllAdmins);
app.get('/admin/:adminId', admin_routes.getAdmin);


/********** User **********/
app.get('/user/', user_routes.getAllUsers);
app.get('/user/:userId', user_routes.getUser);
app.get('/user/:userId/openVotes', user_routes.getOpenVotes);
app.get('/user/:userId/results', user_routes.getResults);


/********** Smart Contracts **********/
app.get('/smartContract/', smart_contract_routes.getAllSmartContracts);
app.get('/smartContract/:smId', smart_contract_routes.getSmartContract);
app.post('/smartContract/:smId', smart_contract_routes.postSmartContract);


/********** Audits **********/
app.get('audit/:auditId', audit_routes.getAuditResults);


/********** Votations **********/
app.get('/votation', votation_routes.getAllVotations);
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
