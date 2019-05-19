import React, {Component} from 'react';
import {Button} from 'reactstrap';
import '../styles/Footer.css'
import swal from 'sweetalert';


    let about_us = {
          title: "About us",
          text: "Estudiantes de la FIB",
    };
    let contact = {
         title: "Contact",
         text: "Para contactar con nosotros..."
     };

export default class Footer extends Component{

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-footer-height navbar51" >
        <div className="container">
          <ul className="nav navbar-nav lg-auto">
            <li className="nav-item"><a className="nav-link" href="#">© 2019 Ethervote</a></li>
          </ul>
          <ul className="nav navbar-nav">

            <li className="nav-item">
              <Button className="btn4" onClick={() => {swal(about_us)}}> About us </Button>            </li>
            <li className="nav-item">
              <Button className="btn4" onClick={() => {swal(contact)}}> Contact </Button>            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
