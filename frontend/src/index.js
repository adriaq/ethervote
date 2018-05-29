import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import User from './User';
import User2 from './User2';
import Admin from './Admin';
import OpenPolls from './OpenPoll';
import PollsResult from './PollResults';
import Ethervote from './Ethervote';
import CreatePoll from './CreatePoll';
import AddUser from './AddUser';
import Logout from './Logout';
import Firstlogin from './Firstlogin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



const color = {
    backgroundColor:'#ffffff'
};

const Root = () => {
    return (
        <BrowserRouter>
        <Ethervote />
        </BrowserRouter>
    )
};

ReactDOM.render(<Root />, document.getElementById('root'));
