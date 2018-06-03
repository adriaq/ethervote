import React, {Component} from 'react';
import {Button} from 'reactstrap';
import '../styles/Footer.css'


export default class Footer extends Component{

  render(){
    return(
      <nav className="navbar fixed-bottom navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand-footer">Ethervote 2018 - A blockchain based voting system </a>
        </div>
      </nav>
    );
  }
}
