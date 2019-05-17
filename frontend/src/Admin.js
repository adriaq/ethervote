import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import './styles/Admin.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import img_admin from './img/administrator-128.png';

import CreatePoll from "./CreatePoll";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import User from "./User";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.ethervoteAddress = this.props.ethervoteAddress;
        this.web3 = this.props.web3;
        this.goToUser = this.goToUser.bind(this);
        this.goToNewPoll = this.goToNewPoll.bind(this);
        this.goToAddUser = this.goToAddUser.bind(this);
        this.goToEditUser = this.goToEditUser.bind(this);
        this.goToDeleteUser = this.goToDeleteUser.bind(this);
    }

    goToUser() {
        ReactDOM.render(<User web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    goToNewPoll() {
        ReactDOM.render(<CreatePoll web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    goToAddUser() {
        ReactDOM.render(<AddUser web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    goToEditUser() {
        ReactDOM.render(<EditUser web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    goToDeleteUser() {
        ReactDOM.render(<DeleteUser web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
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
                        <Button className="btn_admin btn-generic" onClick={this.goToUser} > Go to Polls </Button><br/>
                        <Button className="btn_admin btn-generic" onClick={this.goToNewPoll}> Create a New Poll </Button><br/>
                        <Button className="btn_admin btn-generic" onClick={this.goToAddUser} > Add User</Button><br/>
                        <Button className="btn_admin btn-generic" onClick={this.goToEditUser} > Edit User</Button><br/>
                        <Button className="btn_admin btn-generic" onClick={this.goToDeleteUser} > Delete User</Button><br/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Admin;
