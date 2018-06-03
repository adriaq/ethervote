import React, {Component} from 'react';
import {Button} from 'reactstrap';
import '../styles/Footer.css'


export default class Footer extends Component{

  render(){
    return(
      <nav class="navbar fixed-bottom navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand-footer">Ethervote 2018 - A blockchain based voting system </a>
        </div>
      </nav>
    );
  }
}
