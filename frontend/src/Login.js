import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import './Login.css'
import App from './App'
import ReactDOM from 'react-dom';


const PAGES = {
    '/': Login,
    '/App': App,
};



class Login extends Component {


    login = (event) => {


       // if (document.getElementsByClassName('hola') !== null) {
           // const str = document.getElementsByClassName("hola").value;
           // if (str == "a") {
                ReactDOM.render(
                    <App/>,
                    document.getElementById('root')
                );
           // }
       // }
    };

    render() {
        return (
            <div >
                <header className="Login-header">
                    <h1 className="Login-title">Welcome to Ethervote</h1>
                </header>

                <div className="component-search-input">
                    <div>
                        <p> USER: </p>
                        <input className="hola" type="text" value={this.value}

                           /* onChange={this.handleChange}*/
                        />
                    </div>

                    <div>
                        <p> PASSWORD: </p>
                        <input
                            /* onChange={this.handleChange}*/
                        />
                    </div>
                </div>

                <div className="AcessButton">
                    <ButtonToolbar className="Button">
                        <Button onClick={this.login}> Login </Button>
                    </ButtonToolbar>

                    <p className="demo"> </p>
                </div>


            </div>
        );
    }

}

export default Login;