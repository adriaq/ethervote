import React, {Component} from 'react';
import {Button} from 'reactstrap';


export default class Footer extends Component{

  render(){
    return(
      <div class="container position-static">
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1">© 2018 ethervote</span>
      </nav>
      </div>
    );
  }
}
