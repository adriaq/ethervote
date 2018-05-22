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
                          <li><a href="/logout" className="logout"> Log out </a></li>
                      </ul>
                      <ul className="nav navbar-nav">
                          <ButtonToolbar>
                              <DropdownButton title="Help" pullRight id="dropdown-no-caret">
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
                  </div>
              </div>
          </nav>

          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container">
            <a class="navbar-brand" href="/">Ethervote</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/admin">Dashboard</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/admin">Open polls</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/createPoll">New Poll</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/logout">Log out</a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
            </div>
          </nav>
    
      </div>

      );
  }
}
