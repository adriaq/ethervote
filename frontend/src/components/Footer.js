import React, {Component} from 'react';
import {Button} from 'reactstrap';
import '../styles/Footer.css'


export default class Footer extends Component{

  render(){
    return(
      <nav class="navbar fixed-bottom navbar-expand-lg navbar-light bg-light navbar-footer-height" >
        <div class="container">
          <ul class="nav navbar-nav"><br/>
            <li class="nav-item active">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Register</a>
            </li>
          </ul>
          <ul class="nav navbar-nav mx-auto">
            <li class="nav-item"><a class="nav-link" href="#">© 2018 Ethervote</a></li>
          </ul>
          <ul class="nav navbar-nav">

            <li class="nav-item">
              <a class="nav-link" href="#">About us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Help</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
