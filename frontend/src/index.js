import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import User from './User';
import User2 from './User2';
import Admin from './Admin';
import OpenPolls from './OpenPoll';
import PollsResult from './PollResults';
import CreatePoll from './CreatePoll';
import AddUser from './AddUser';
import Logout from './Logout';

import Ethervote from './Ethervote';

import Firstlogin from './Firstlogin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



const color = {
    backgroundColor:'#ffffff'
};

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/openPoll" component={OpenPolls}/>
                <Route path="/user" component={User}/>
                <Route path="/user2" component={User2}/>
                <Route path="/pollsResult" component={PollsResult}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/createPoll" component={CreatePoll}/>
                <Route path="/addUser" component={AddUser}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/main" component={Ethervote}/>
                <Route path="/Firstlogin" component={Firstlogin}/>
                <Route path="/" component={Ethervote}/>
            </Switch>
        </BrowserRouter>
    )
};

ReactDOM.render(<Root />, document.getElementById('root'));
