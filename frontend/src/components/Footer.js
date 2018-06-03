import React, {Component} from 'react';
import {Button} from 'reactstrap';
import '../styles/Footer.css'


export default class Footer extends Component{

  render(){
    return(
      <nav className="navbar fixed-bottom navbar-expand-lg navbar-light bg-light navbar-footer-height" >
        <div className="container">
          <ul className="nav navbar-nav"><br/>
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Register</a>
            </li>
          </ul>
          <ul className="nav navbar-nav mx-auto">
            <li className="nav-item"><a className="nav-link" href="#">© 2018 Ethervote</a></li>
          </ul>
          <ul className="nav navbar-nav">

            <li className="nav-item">
              <a className="nav-link" href="#">About us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Help</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
