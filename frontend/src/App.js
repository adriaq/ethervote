import React, { Component } from 'react';
import logo from './logo.svg';
import construction from './contruction.gif';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroup'
import './App.css';
import Header from "./objects/Header";
import MenuVotacions from "./objects/MenuVotacions";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {



        };
    }


  render() {

    return (


            <div className="App">
                <Header/>
                <body className="App-body">
                <p className="App-intro">
                    Pàgina en construcció
                    <img src={construction} className="App-logo" alt="construction"/>
                </p>
                <span className="menus">
                     <MenuVotacions className="MenuVotacions2"/>
                     <MenuVotacions className="MenuVotacions"/>
                </span>

                </body>
            </div>



      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/
    );
  }
}

export default App;
