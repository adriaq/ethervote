import React, { Component } from 'react';
import {Button} from 'reactstrap';
import './styles/Admin.css';
import Header from "./components/Header";

class Admin extends Component {
    render() {
        return(
            <div>
                <div>
                    <Header/>
                </div>

                <div className="main-window">
                    <p> Aqui he afegit botons per poder navegar per les diferents vistes pero en un futur es carrega /admin, /app o / depenen
                    de la clau publica que llegeixi de la wallet</p>

                    <div className="btn-group-lg">
                        <Button className="btn_admin" color="primary" href="/createPoll"> NEW POLL </Button>
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
