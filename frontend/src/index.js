import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login'
//import Game from './App';
import registerServiceWorker from './registerServiceWorker';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(


    <Login />,
    //<App/>,
    document.getElementById('root')
);
    registerServiceWorker();
