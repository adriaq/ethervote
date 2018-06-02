import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';

import env from './config/env';

const fs = require('fs');

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
=            Basic Authentication            =
===========================================*/

//app.use(require('node-basicauth')({'haochuan': 'password'}));

/*=====  End of Basic Authentication  ======*/

/*===========================
=            COR            =
===========================*/

// app.use(require('cors')());

/*=====  End of COR  ======*/

/*===========================
=           ROUTES          =
===========================*/

app.post('/post_ethervote', function(req, res) {
    //console.log(req.body);
    fs.writeFile(__dirname+"/smartContractData.json", JSON.stringify(req.body), "utf8", function(error){
       if (error) res.status(500).json(error);
       else res.status(200).send("Data written in file");
    });
});

app.get('/get_ethervote', function (req, res) {
    fs.readFile(__dirname+"/smartContractData.json", "utf8", function (error, response) {
        if (!error) {
            res.status(200).json(JSON.parse(response));
        } else {
            res.status(500).send("error");
        }
    });
});


/*=====  End of Routes  ======*/


// Load React App
// Serve HTML file for production
if (env.name === 'production') {
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

export default app;
