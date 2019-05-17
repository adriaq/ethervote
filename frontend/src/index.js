import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import User from './User';
import User2 from './User2';
import Admin from './Admin';
import OpenPolls from './OpenPoll';
import PollResults from './PollResults';
import CreatePoll from './CreatePoll';
import AddUser from './AddUser';
import Logout from './Logout';

import Ethervote from './Ethervote';

import Firstlogin from './Firstlogin';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

//import { createHashHistory } from 'history'

const color = {
    backgroundColor:'#ffffff'
};
//const history = createHashHistory()
const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Ethervote}/>
            </Switch>
        </BrowserRouter>
    )
};

ReactDOM.render(<Root />, document.getElementById('root'));
