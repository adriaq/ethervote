import React, {Component} from 'react';
import '../styles/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends Component{

  render(){
      return(

      <div>
          <nav className="navbar navbar-expand-lg custom-navbar">
            <div class="container">
              <div className="navbar-header">
                  <p className="navbar-brand">Ethervote </p>
              </div>


              <div className="hola">
                  <ul className="nav .justify-content-end">

                      <li className="nav-item">
                          <a className="nav-link" color="white" href="/">Home <span className="sr-only">(current)</span></a>
                      </li>

                      <li className="nav-item">
                          <a className="nav-link" href="/logout">Log out</a>
                      </li>

                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" >Help</a>
                          <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">Action</a>
                              <a className="dropdown-item" href="#">Another action</a>
                              <a className="dropdown-item" href="#">Something else here</a>
                          </div>
                      </li>
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
