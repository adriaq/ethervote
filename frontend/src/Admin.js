import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import './styles/Admin.css';
import Header from "./components/Header";
import img_admin from './img/administrator-128.png';
import CreatePoll from "./CreatePoll";
import AddUser from "./AddUser";


class Admin extends Component {
    constructor(props) {
        super(props);
        this.ethervote = this.props.ethervote;
        this.web3 = this.props.web3;
        this.goToNewPoll = this.goToNewPoll.bind(this);
        this.goToAddUser = this.goToAddUser.bind(this);
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

                    <img src={img_admin} alt="admin"/>

                    <div className="btn-group-lg">
                        <Button className="btn_admin" color="primary" onClick={this.goToNewPoll}> NEW POLL </Button>
                        <Button className="btn_admin" color="primary" onClick={this.goToAddUser} > ADD USER</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Admin;
