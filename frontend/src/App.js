import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'react-bootstrap';
import construction from './contruction.gif';
import ReactDOM from 'react-dom';
import './App.css';
import Header from "./objects/Header";
import MenuVotacions from "./objects/MenuVotacions";
import Login from "./Login";


class App extends Component {
    back = (event) => {
        ReactDOM.render(
            <Login/>,
            document.getElementById('root')
        );
    };


  render() {

    return (


            <div className="App">
                <Header/>
                <body className="App-body">
                <p className="App-intro">
                    Pàgina en construcció
                    <img src={construction} className="App-logo" alt="construction"/>
                </p>
                <div className="col-sm-4">
                     <MenuVotacions className="MenuVotacions2"/>
                     <MenuVotacions className="MenuVotacions"/>
                </div>

                <Button onClick={this.back}> Back </Button>
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
