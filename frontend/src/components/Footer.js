import React, {Component} from 'react';
import {Button} from 'reactstrap';
import '../styles/Footer.css'


export default class Footer extends Component{

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-footer-height" >
        <div className="container">
          <ul className="nav navbar-nav lg-auto">
            <li className="nav-item"><a className="nav-link" href="#">© 2018 Ethervote</a></li>
          </ul>
          <ul className="nav navbar-nav">

            <li className="nav-item">
              <a className="nav-link" href="#">About us</a>
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
