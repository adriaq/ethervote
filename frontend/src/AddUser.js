import React, { Component } from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AddUser.css'
import img_user from './img/add-user-2-128.gif';
import Header from "./components/Header";



class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPK: '',
            privilegeLevel: '1',
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitbtn = this.submitbtn.bind(this);
    }

    updateInputValueUser(evt) {
        this.setState({
            userPK: evt.target.value
        });
    }

    handleChange(event) {
        this.setState({privilegeLevel: event.target.value});
    }


    submitbtn() {

        if (this.state.userPK === '') {
            alert ("You must enter a public key before submit");

        }
        else {
            fetch('/admin/:publicKey/addVoter', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userPK: this.state.userPK,
                    privilegeLevel: this.state.privilegeLevel,
                })
            })

            alert("User with public key    **  " + this.state.userPK + "  **    has been submitted");
        }
    }


render() {

        return(
            <div>
                <div>
                    <Header/>
                </div>

                <div className="col-lg-3">
                    <img src={img_user} alt="user"/>

                </div>

                <div className="col-lg-9">
                    <div className="input">
                        <div>
                            <p> USERNAME: </p>
                            <input value={this.state.inputValueUser} onChange={evt => this.updateInputValueUser(evt)}
                            />

                            <div className="custom-select">

                                <div className="col-lg-8">
                                    <p> PRIVILEGE LEVEL: </p>

                                    <select className="selectpicker" value={this.state.value} onChange={this.handleChange} >
                                        <option>1</option>
                                        <option>2</option>

                                    </select>

                                </div>


                                <div className="col-lg-4">
                                    <Button className="submit-btn" color="primary" onClick={this.submitbtn}>Submit</Button>
                                </div>

                            </div>



                        </div>



                    </div>
                </div>

                <div className="col-lg-12">
                    <Button  color="danger" href="/admin"> Back </Button>
                </div>

            </div>
        );
    }

}

export default AddUser;