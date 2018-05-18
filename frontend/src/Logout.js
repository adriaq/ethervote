import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {Glyphicon, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import './styles/Logout.css';
import Goodbye from './img/goodbye.gif'

class Logout extends Component {
    constructor(props) {
        super(props);
    }

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
                    <img src={Goodbye} className="imatge"/>
                </div>
            </div>
        );
    }
}

export default Logout;