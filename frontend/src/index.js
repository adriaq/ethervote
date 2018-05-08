import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Login from './Login'

import { BrowserRouter, Route, Switch } from 'react-router-dom';


const Root = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Switch>
                    <Route path="/app" component={App}/>
                    <Route path="/" component={Login}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
