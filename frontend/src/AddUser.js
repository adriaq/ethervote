import React, { Component } from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AddUser.css'
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
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
                    <nav class="navbar navbar-expand-lg custom-navbar">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <a class="navbar-brand"> ADD NEW USER </a>
                            </div>
                            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                                <ul class="nav navbar-nav">
                                    <li><a href="#"> Help </a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="imtge">
                    <img
                        src="./img/userAdd.png"
                    />


                </div>


                <div className="component-search-input">
                    <div>
                        <p> USERNAME: </p>
                        <input value={this.state.inputValueUser} onChange={evt => this.updateInputValueUser(evt)}
                        />
                    </div>


                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Priority
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem >Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>


                </div>





                <div className="imtge">
                    <Button  color="danger" href="/admin"> Back </Button>
                </div>
            </div>
        );
    }

}

export default AddUser;