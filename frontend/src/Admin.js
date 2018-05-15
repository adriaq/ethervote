import React, { Component } from 'react';
import {Button} from 'reactstrap';

class Admin extends Component {
    render() {
        return(
            <div>
                <div>
                    <nav class="navbar navbar-expand-lg custom-navbar">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <a class="navbar-brand" href="/"> WELCOME ADMIN! </a>
                            </div>
                            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                                <ul class="nav navbar-nav">
                                    <li><a href="#"> Help </a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div>
                    <p> Aqui he afegit botons per poder navegar per les diferents vistes pero en un futur es carrega /admin, /app o / depenen
                    de la clau publica que llegeixi de la wallet</p>
                    <Button> NEW POLL </Button>
                    <Button> ADD USER</Button>
                    <Button href="/app" > USER MAIN PAGE </Button>
                    <Button  color="danger" href="/main"> Back </Button>
                </div>
            </div>
        );
    }

}

export default Admin;