import React, {Component} from 'react';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import '../styles/Header.css'


export default class Header extends Component{

  render(){
      return(

      <div>
          <nav className="navbar navbar-expand-lg custom-navbar">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <p className="navbar-brand"> Welcome to Ethervote! </p>
                  </div>
                  <div className="collapse navbar-collapse" id="collapsibleNavbar">
                      <ul className="nav navbar-nav">
                          <li class="nav-item">
                              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                          </li>

                          <li class="nav-item">
                              <a class="nav-link" href="/logout">Log out</a>
                          </li>

                          <ButtonToolbar>
                              <DropdownButton title="Help" pullRight id="dropdown-no-caret" class="nav-item">
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
                          </ButtonToolbar>

                      </ul>

                      <ul className="nav navbar-nav">

                      </ul>
                  </div>
              </div>
          </nav>



    
      </div>

      );
  }
}
