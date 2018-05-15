import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './styles/Login.css'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValueUser: '',
            inputValuePasswd: '',
            errorMsg: ''
        };
    }

    updateInputValueUser(evt) {
        this.setState({
            inputValueUser: evt.target.value
        });
    }

    updateInputValuePasswd(evv) {
        this.setState({
            inputValuePasswd: evv.target.value
        });
    }

    login = (event) => {
        this.setState({
            errorMsg:"Wrong username or password!"
        });

    }

    render() {
        return (
            <div >
                <header className="Login-header">
                    <h1 className="Login-title">Welcome to Ethervote</h1>
                </header>

                <div className="component-search-input">
                    <div>
                        <p> USERNAME: </p>
                        <input value={this.state.inputValueUser} onChange={evt => this.updateInputValueUser(evt)}
                        />
                    </div>

                    <div>
                        <p> PASSWORD: </p>
                        <input value={this.state.inputValuePasswd} onChange={evv => this.updateInputValuePasswd(evv)}
                        />
                    </div>
                </div>

                <div className="AcessButton">
                    <Button color="primary" className="btn" href="/app"> Login </Button>
                </div>

                <div className="error">
                    <p>{this.state.errorMsg}</p>
                </div>
            </div>
        );
    }

}

export default Login;