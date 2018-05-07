import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import './Login.css'
import App from './App'





class Login extends Component {
    handleChange = (event) => {
        this.props.textChange(event);
    }

    login = (event) => {


    }

    render() {
        return (
            <div >
                <header className="Login-header">
                    <h1 className="Login-title">Welcome to Ethervote</h1>
                </header>

                <div className="component-search-input">
                    <div>
                        <p> USER: </p>
                        <input
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
                </div>


            </div>
        );
    }

}

export default Login;