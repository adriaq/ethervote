import React, {Component} from 'react';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import '../styles/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends Component{

  render(){
      return(

      <div>
          <nav className="navbar navbar-expand-lg header custom-navbar">
            <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="/">Ethervote </a>
                </div>

                <div className="collapse navbar-collapse" >
                    <ul className="nav navbar-nav hola">
                        <ButtonToolbar>
                            <DropdownButton title="Help" pullRight id="dropdown-no-caret">
                                <MenuItem eventKey="1">
                                    <p> You can create a new poll in the <i> Create poll </i> division </p>
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="2">
                                    <p> You can see a list of the polls you have access to vote in the
                                        <br/> <i> Open polls </i> division </p>
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="3">
                                    <p> You can see a list of the polls in which you have participated
                                        <br/>  in the <i> Results </i> division </p>
                                </MenuItem>
                            </DropdownButton>
                        </ButtonToolbar>
                    </ul>
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
