import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Admin from './Admin';
import OpenPolls from './OpenPolls';
import PollsResult from './PollsResults';
import Ethervote from './Ethervote';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



const color = {
    backgroundColor:'#EAEBEC'
};

const Root = () => {
    return (


        <div style={color}>
            <BrowserRouter>
                <Switch>
                    <Route path="/openPolls" component={OpenPolls}/>
                    <Route path="/app" component={App}/>
                    <Route path="/pollsResult" component={PollsResult}/>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/" component={Ethervote}/>
                    <Route path="/main" component={Ethervote}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
};

ReactDOM.render(<Root />, document.getElementById('root'));
