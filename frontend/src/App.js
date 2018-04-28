import React, { Component } from 'react';
import logo from './logo.svg';
import construction from './contruction.gif';

import './App.css';
import Menu, {SubMenu, MenuItem} from 'rc-menu';


class App extends Component {
  render() {
    return (

        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Welcome USER!</h1>
            </header>
            <body className="App-body">
                <p className="App-intro">
                    Pàgina en construcció
                    <img src={construction} className="App-logo" alt="construction" />
                </p>

                <MenuContainer />
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


class MenuContainer extends Component {
    render() {
        return (
            <div>
                <div >
                    <p className="TitolMenu">Select an open vote</p>
                    <ul className="Menu">
                        <Button bsStyle="primary" />
                        <li className="llista" >USA PRESIDENT</li>
                        <li className="llista" >CEO ELECTION</li>
                        <li className="llista" >MY DOG'S NAME</li>
                        <li className="llista">NEW HARRY POTTER FILM?</li>
                        <li className="llista">SHOULD TAXES INCREASE?</li>
                        <li className="llista" >GRUPS FESTA FIB 2018</li>
                    </ul>
                </div>
            </div>
        );
    }
}

class Button extends Component {
    render() {
        return (
            <li className="llista" >Hola, soc un boto pero encara no faig res</li>
        );
    }
 }



/*function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}*/

/*class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: ' +
            (this.state.xIsNext ? 'X' : 'O');

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}*/







export default App;
