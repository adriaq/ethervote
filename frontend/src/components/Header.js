import React, {Component} from 'react';
import {Navbar, NavItem} from 'react-bootstrap';
import '../styles/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import {Button} from 'reactstrap';
import Ethervote from "../Ethervote";
import ReactDOM from 'react-dom';

const ethervoteimg = require('../img/logo-header.png');

export default class Header extends Component{

    goToHome() {
        console.log(this.web3);
        ReactDOM.render(<Ethervote web3={this.web3} ethervote={this.ethervote}/>, document.getElementById('root'));
    }



    render(){

        let help = {
            title: "Help",
            text: "This is Ethervote, a blockchain based voting system. \n In this platform your organization members will be able to \
                    organize and participate in secure votation processes.",
            icon: "info",
            button: {
                text: "Understood!",
                className: "botosweet"
            }
        };

        return(

            <div>
                <nav className="navbar navbar-expand-lg header custom-navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <img src={ethervoteimg} alt="logo"/>
                        </div>
                        <div className="navbar-collapse" >
                            <Button className="btn1" onClick={() => this.goToHome()} > Home </Button>
                            <Button className="btn2" onClick={() => {swal(help)}} > Help </Button>
                        </div>
                    </div>
                </nav>

            </div>


        );
    }
}
/*  <ButtonToolbar>
                          <DropdownButton title="Help" pullRight id="dropdown-no-caret" className="nav-item">
                              <MenuItem eventKey="1">
                                  <p> You can see a list of the polls you have access to vote in the
                                      <br/> <i> Open polls </i> division </p>
                              </MenuItem>
                              <MenuItem divider />
                              <MenuItem eventKey="2">
                                  <p> You can see a list of the polls in which you have participated
                                      <br/>  in the <i> Results </i> division </p>
                              </MenuItem>
                          </DropdownButton>
                      </ButtonToolbar>*/
