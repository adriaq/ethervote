import React, { Component } from 'react';
import {Button} from 'reactstrap';
import './styles/Admin.css';
import Header from "./components/Header";
import img_admin from './img/administrator-128.png';

class Admin extends Component {
    render() {
        return(
            <div>
                <div>
                    <Header/>
                </div>

                <div className="main-window">

                    <img src={img_admin} alt="admin"/>

                    <div className="btn-group-lg">
                        <Button className="btn_admin" color="primary" href="/createPoll"> NEW POLL </Button>
                        <Button className="btn_admin" color="primary"  href="/addUser" > ADD USER</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Admin;
