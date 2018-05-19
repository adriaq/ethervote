import React, {Component} from 'react';
import {Button} from 'reactstrap';


export default class Header extends Component{

  render(){
    return(

      <div>
        <nav class="navbar navbar-expand-lg custom-navbar">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand"> {this.props.title} </a>
            </div>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
              <ul class="nav navbar-nav">
                <li><a href="#"> Help </a></li>
              </ul>
            </div>

            <div>
              <Button className="enrere" color="danger" href="/"> Back </Button>
            </div>
          </div>
        </nav>


      </div>

    );
  }
}
