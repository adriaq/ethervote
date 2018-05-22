import React, { Component } from 'react';
import './styles/Logout.css';
import Goodbye from './img/goodbye.gif'

class Logout extends Component {
    render() {

        return (
            <div>
                <nav class="navbar navbar-expand-lg custom-navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <p class="navbar-brand"> See you soon! </p>
                        </div>
                    </div>
                </nav>

                <div>
                    <img src={Goodbye} className="imatge" alt="goodbye"/>
                </div>
            </div>
        );
    }
}

export default Logout;