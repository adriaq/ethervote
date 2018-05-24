import React, {Component} from 'react';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import '../styles/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends Component{

  render(){
      return(

      <div>
          <nav className="navbar navbar-expand-lg custom-navbar">

                  <div className="navbar-header">
                      <p className="navbar-brand">Ethervote </p>
                  </div>


              <div className="hola">
                  <ul class="nav .justify-content-end">

                      <li class="nav-item">
                          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                      </li>

                      <li class="nav-item">
                          <a class="nav-link" href="/logout">Log out</a>
                      </li>



                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" >Help</a>
                          <div class="dropdown-menu">
                              <a class="dropdown-item" href="#">Action</a>
                              <a class="dropdown-item" href="#">Another action</a>
                              <a class="dropdown-item" href="#">Something else here</a>
                          </div>



                      </li>

                  </ul>
              </div>


          </nav>




      </div>

      );
  }
}
/*  <ButtonToolbar>
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
                      </ButtonToolbar>*/