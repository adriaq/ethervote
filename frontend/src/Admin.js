import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import './styles/Admin.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import img_admin from './img/administrator-128.png';

import CreatePoll from "./CreatePoll";
import AddUser from "./AddUser";
import User from "./User";
import OpenPoll from "./OpenPoll";


class Admin extends Component {
    constructor(props) {
        super(props);
        this.ethervote = this.props.ethervote;
        this.web3 = this.props.web3;
        this.goToUser = this.goToUser.bind(this);
        this.goToNewPoll = this.goToNewPoll.bind(this);
        this.goToAddUser = this.goToAddUser.bind(this);
    }

    goToUser() {
        console.log(this.web3);
        ReactDOM.render(<User web3={this.web3} ethervote={this.ethervote}/>, document.getElementById('root'));
    }

    goToNewPoll() {
        console.log(this.web3);
        ReactDOM.render(<CreatePoll web3={this.web3} ethervote={this.ethervote}/>, document.getElementById('root'));
    }

    goToAddUser() {
        console.log(this.web3);
        ReactDOM.render(<AddUser web3={this.web3} ethervote={this.ethervote}/>, document.getElementById('root'));
    }


    render() {
        return(
            <div>
                <div>
                    <Header/>
                </div>

                <div className="main-window">
                    <div className="btn-group-lg">
                        <img src={img_admin} alt="admin"/><br/>
                        <Button className="btn_admin btn-generic" color="primary" onClick={this.goToUser} > Go to Polls </Button><br/>
                        <Button className="btn_admin btn-generic" color="primary" onClick={this.goToNewPoll}> Create a New Poll </Button><br/>
                        <Button className="btn_admin btn-generic" color="primary" onClick={this.goToAddUser} > Add User</Button><br/>
                        <Button className="btn_admin btn-danger" color="primary" href="/logout" > Log out</Button>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default Admin;
