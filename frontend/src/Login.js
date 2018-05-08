import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import './Login.css'
import App from './App'
import ReactDOM from 'react-dom';





class Login extends Component {


    login = (event) => {
       // ReactDOM.render( <App/>, document.getElementById('app'));
        this.props.history.push('/app');
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
                            <Button className="btn" onClick={this.login}> Login </Button>
                        </ButtonToolbar>
                </div>


            </div>
        );
    }

}

export default Login;