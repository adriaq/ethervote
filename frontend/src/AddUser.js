import React, { Component } from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AddUser.css'
import img_user from './img/add-user-2-128.gif';
import Header from "./components/Header";
import Footer from "./components/Footer";


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.ethervote = this.props.ethervote;
        this.web3 = this.props.web3;
        this.state = {
            userPK: null,
            privilegeLevel: '0',
        };
        this.updateInputValueUser = this.updateInputValueUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitbtn = this.submitbtn.bind(this);
    }

    updateInputValueUser(event) {
        event.preventDefault();
        this.setState({
            userPK: event.target.value
        });
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({privilegeLevel: event.target.value});
    }


    submitbtn() {
        console.log(this.ethervote);
        if (this.state.userPK === '') {
            alert ("You must enter a public key before submit");

        }
        else {
            this.ethervote.addVoter(this.state.userPK, this.state.privilegeLevel, function (error, result) {
                if(!error) {
                    console.log(result);
                    alert("voter added!")
                }
                else {
                    alert("Error adding voter");
                }
            });
        }
    }


    render() {

        return(
            <div>
                <div>
                    <Header/>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <img src={img_user} alt="user"/>
                    </div>

                    <div className="col-lg-9">
                        <div className="input">
                            <div>
                                <p> USERNAME: </p>
                                <input value={this.state.inputValueUser} onChange={evt => this.updateInputValueUser(evt)}
                                />

                                <div className="col-lg-8">
                                    <p> PRIVILEGE LEVEL: </p>
                                    <select className="selectpicker" value={this.state.value} onChange={this.handleChange} >
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </div>

                                <div className="ei">
                                    <Button className="submit-btn" color="primary" onClick={this.submitbtn}>Submit</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <Button  color="danger" href="/"> Back </Button>
                </div>
              <Footer/>
            </div>
        );
    }

}

export default AddUser;
