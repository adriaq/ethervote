import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Login from './Login'

import { BrowserRouter, Route, Switch } from 'react-router-dom';


const color = {
    backgroundColor:'#EAEBEC'
};

const Root = () => {
    return (


        <div style={color}>
            <BrowserRouter>
                <Switch>
                    <Route path="/app" component={App}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Login}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
