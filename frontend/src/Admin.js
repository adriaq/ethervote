import React, { Component } from 'react';
import {Button} from 'reactstrap';
import './styles/Admin.css';

class Admin extends Component {
    render() {
        return(
            <div>
                <div>
                    <nav class="navbar navbar-expand-lg custom-navbar">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <a class="navbar-brand"> WELCOME ADMIN! </a>
                            </div>
                            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                                <ul class="nav navbar-nav">
                                    <li><a href="#"> Help </a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="main-window">
                    <p> Aqui he afegit botons per poder navegar per les diferents vistes pero en un futur es carrega /admin, /app o / depenen
                    de la clau publica que llegeixi de la wallet</p>

                    <div className="btn-group-lg">
                        <Button className="btn_admin" color="primary" href="#"> NEW POLL </Button>
                        <Button className="btn_admin" color="success"  href="/addUser" > ADD USER</Button>
                        <Button className="btn_admin" color="warning" href="/app" > USER MAIN PAGE </Button>
                        <Button className="btn_admin" color="danger" href="/main"> Back </Button>
                    </div>

                </div>
            </div>
        );
    }

}

export default Admin;