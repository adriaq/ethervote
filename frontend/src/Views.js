
import React, { Component } from 'react';

import Login from './Login'
import App from './App'

const PAGES = {
    '/': Login,
    '/App': App,
};

class Views extends Component {
    render() {
        const Handler = PAGES[this.props.pathname] || Login;

        return <Handler />;
    }
}

export default Views;