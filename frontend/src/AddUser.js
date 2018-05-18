import React, { Component } from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AddUser.css'
import img_user from './img/add-user-2-128.gif';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            userPK: '',
            privilegeLevel: '',
            dropdownOpen: false,
        };
    }


    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    updateInputValueUser(evt) {
        this.setState({
            userPK: evt.target.value
        });
    }

    updateInputValuePasswd(evv) {
        this.setState({
            iprivilegeLevel: evv.target.value
        });
    }
    render() {

        return(
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg custom-navbar">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> ADD NEW USER </a>
                            </div>
                            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                <ul className="nav navbar-nav">
                                    <li><a href="#"> Help </a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="col-lg-3">
                    <img
                        src={img_user}
                    />

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

                                    <select className="selectpicker">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>

                                </div>


                                <div className="col-lg-4">
                                    <Button className="submit-btn" color="primary" href="/admin">Submit</Button>
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